from django.db import models
from django.contrib.auth.models import User
from django.contrib.contenttypes.fields import GenericForeignKey
from django.core.validators import MinValueValidator, MaxValueValidator
import uuid

class Company(models.Model):
    """Model representing a company for investment analysis"""
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    description = models.TextField()
    industry = models.CharField(max_length=100)
    stage = models.CharField(max_length=50, choices=[
        ('pre-seed', 'Pre-Seed'),
        ('seed', 'Seed'),
        ('series-a', 'Series A'),
        ('series-b', 'Series B'),
        ('series-c', 'Series C+')
    ])
    founded_year = models.IntegerField()
    headquarters = models.CharField(max_length=255)
    website = models.URLField(blank=True, null=True)
    logo_url = models.URLField(blank=True, null=True)
    employees_min = models.IntegerField(null=True, blank=True)
    employees_max = models.IntegerField(null=True, blank=True)
    funding_raised = models.DecimalField(max_digits=15, decimal_places=2, null=True, blank=True)
    funding_currency = models.CharField(max_length=3, default='USD')
    
    # AI Analysis Fields
    ai_score = models.IntegerField(
        validators=[MinValueValidator(0), MaxValueValidator(100)],
        null=True, blank=True
    )
    ai_confidence = models.FloatField(
        validators=[MinValueValidator(0.0), MaxValueValidator(1.0)],
        null=True, blank=True
    )
    
    # Metadata
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    
    class Meta:
        verbose_name_plural = "Companies"
        ordering = ['-updated_at']
    
    def __str__(self):
        return self.name
    
    @property
    def employee_range(self):
        if self.employees_min and self.employees_max:
            return f"{self.employees_min}-{self.employees_max}"
        elif self.employees_min:
            return f"{self.employees_min}+"
        return "Unknown"

class CompanyTag(models.Model):
    """Tags for categorizing companies"""
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='tags')
    name = models.CharField(max_length=100)
    
    def __str__(self):
        return f"{self.company.name} - {self.name}"

class Analysis(models.Model):
    """Base analysis model for a company"""
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    summary = models.TextField()
    
    # Scoring
    overall_score = models.IntegerField(
        validators=[MinValueValidator(0), MaxValueValidator(100)],
        null=True, blank=True
    )
    confidence_score = models.FloatField(
        validators=[MinValueValidator(0.0), MaxValueValidator(1.0)],
        null=True, blank=True
    )
    
    # Metadata
    analyst = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_completed = models.BooleanField(default=False)
    
    class Meta:
        abstract = True
    
    def __str__(self):
        return f"{self.company.name} - {self.title}"

class Metric(models.Model):
    """Metrics for company analysis - can be associated with any analysis type"""
    
    CATEGORIES = [
        ('financial', 'Financial Health'),
        ('market', 'Market Position'),
        ('team', 'Team & Execution'),
        ('technology', 'Technology & IP'),
        ('growth', 'Growth Potential'),
        ('risk', 'Risk Assessment'),
        ('perception', 'Perception & Sentiment'),
        ('competitive', 'Competitive Position'),
    ]
    
    # Generic foreign key to any analysis type
    content_type = models.ForeignKey('contenttypes.ContentType', on_delete=models.CASCADE, null=True, blank=True)
    object_id = models.UUIDField(null=True, blank=True)
    analysis = GenericForeignKey('content_type', 'object_id')
    
    category = models.CharField(max_length=50, choices=CATEGORIES)
    name = models.CharField(max_length=255)
    value = models.CharField(max_length=255)
    score = models.IntegerField(
        validators=[MinValueValidator(0), MaxValueValidator(100)],
        null=True, blank=True
    )
    trend = models.CharField(max_length=20, choices=[
        ('up', 'Up'),
        ('down', 'Down'),
        ('stable', 'Stable'),
    ], null=True, blank=True)
    change_percentage = models.FloatField(null=True, blank=True)
    
    def __str__(self):
        return f"{self.name}: {self.value}"

class Lead(models.Model):
    """Investment leads and prospects"""
    
    STATUS_CHOICES = [
        ('new', 'New'),
        ('contacted', 'Contacted'),
        ('qualified', 'Qualified'),
        ('under_review', 'Under Review'),
        ('recommended', 'Recommended'),
        ('passed', 'Passed'),
        ('invested', 'Invested'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='leads')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='new')
    priority = models.CharField(max_length=20, choices=[
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High'),
        ('critical', 'Critical'),
    ], default='medium')
    
    # Lead Management
    assigned_to = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    source = models.CharField(max_length=255, blank=True)
    notes = models.TextField(blank=True)
    
    # AI Scoring
    ai_match_score = models.IntegerField(
        validators=[MinValueValidator(0), MaxValueValidator(100)],
        null=True, blank=True
    )
    
    # Metadata
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.company.name} - {self.get_status_display()}"

class Investment(models.Model):
    """Investment records"""
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='investments')
    lead = models.ForeignKey(Lead, on_delete=models.SET_NULL, null=True, blank=True)
    
    # Investment Details
    amount = models.DecimalField(max_digits=15, decimal_places=2)
    currency = models.CharField(max_length=3, default='USD')
    equity_percentage = models.FloatField(null=True, blank=True)
    valuation = models.DecimalField(max_digits=15, decimal_places=2, null=True, blank=True)
    investment_date = models.DateField()
    
    # Status
    status = models.CharField(max_length=20, choices=[
        ('proposed', 'Proposed'),
        ('approved', 'Approved'),
        ('completed', 'Completed'),
        ('exited', 'Exited'),
    ], default='proposed')
    
    # Metadata
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-investment_date']
    
    def __str__(self):
        return f"{self.company.name} - ${self.amount} ({self.get_status_display()})"

class UserProfile(models.Model):
    """Extended user profile for investment platform"""
    
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    role = models.CharField(max_length=50, choices=[
        ('analyst', 'Analyst'),
        ('portfolio_manager', 'Portfolio Manager'),
        ('partner', 'Partner'),
        ('admin', 'Administrator'),
    ], default='analyst')
    
    # Preferences
    preferred_industries = models.JSONField(default=list)
    notification_preferences = models.JSONField(default=dict)
    
    # Metadata
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.user.username} - {self.get_role_display()}"

# Concrete analysis models for each type

class HighLevelAnalysis(Analysis):
    """High-level investment analysis"""
    
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='high_level_analyses')
    
    # High-level specific fields
    key_findings = models.JSONField(default=list, help_text="Key findings from the analysis")
    risk_factors = models.JSONField(default=list, help_text="Identified risk factors")
    opportunities = models.JSONField(default=list, help_text="Investment opportunities")
    recommendations = models.JSONField(default=list, help_text="Investment recommendations")
    
    class Meta:
        verbose_name = "High-Level Analysis"
        verbose_name_plural = "High-Level Analyses"
        ordering = ['-created_at']


class PerceptionAnalysis(Analysis):
    """Public perception and sentiment analysis"""
    
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='perception_analyses')
    
    # Perception specific fields
    sentiment_score = models.IntegerField(
        validators=[MinValueValidator(0), MaxValueValidator(100)],
        null=True, blank=True,
        help_text="Overall sentiment score (0-100)"
    )
    media_coverage = models.JSONField(default=list, help_text="Media coverage analysis")
    social_sentiment = models.JSONField(default=dict, help_text="Social media sentiment data")
    brand_perception = models.JSONField(default=list, help_text="Brand perception insights")
    
    class Meta:
        verbose_name = "Perception Analysis"
        verbose_name_plural = "Perception Analyses"
        ordering = ['-created_at']


class MarketAnalysis(Analysis):
    """Market analysis and competitive landscape"""
    
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='market_analyses')
    
    # Market specific fields
    market_size = models.CharField(max_length=255, blank=True, help_text="Total addressable market size")
    market_growth_rate = models.FloatField(null=True, blank=True, help_text="Market growth rate percentage")
    competitive_landscape = models.JSONField(default=list, help_text="Competitive landscape analysis")
    market_trends = models.JSONField(default=list, help_text="Current market trends")
    barriers_to_entry = models.JSONField(default=list, help_text="Barriers to market entry")
    
    class Meta:
        verbose_name = "Market Analysis"
        verbose_name_plural = "Market Analyses"
        ordering = ['-created_at']


class KeyIndividualsAnalysis(Analysis):
    """Key individuals and executive team analysis"""
    
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='key_individuals_analyses')
    
    # Team specific fields
    team_strength_score = models.IntegerField(
        validators=[MinValueValidator(0), MaxValueValidator(100)],
        null=True, blank=True,
        help_text="Overall team strength score"
    )
    leadership_assessment = models.TextField(blank=True, help_text="Leadership team assessment")
    team_strengths = models.JSONField(default=list, help_text="Team strengths and positive attributes")
    team_risks = models.JSONField(default=list, help_text="Team-related risks")
    team_recommendations = models.JSONField(default=list, help_text="Team-related recommendations")
    
    class Meta:
        verbose_name = "Key Individuals Analysis"
        verbose_name_plural = "Key Individuals Analyses"
        ordering = ['-created_at']


class CompetitiveAnalysis(Analysis):
    """Competitive analysis and positioning"""
    
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='competitive_analyses')
    
    # Competitive specific fields
    competitive_position = models.CharField(max_length=100, blank=True, help_text="Market position")
    competitor_analysis = models.JSONField(default=list, help_text="Detailed competitor analysis (for Competitive Landscape tab)")
    
    # SWOT Analysis fields
    swot_strengths = models.JSONField(default=list, help_text="SWOT: Internal strengths")
    swot_weaknesses = models.JSONField(default=list, help_text="SWOT: Internal weaknesses")
    swot_opportunities = models.JSONField(default=list, help_text="SWOT: External opportunities")
    swot_threats = models.JSONField(default=list, help_text="SWOT: External threats")
    
    # Competitive Positioning fields
    competitive_advantages = models.JSONField(default=list, help_text="List of competitive advantages")
    competitive_threats = models.JSONField(default=list, help_text="List of competitive threats")
    differentiation_factors = models.JSONField(default=list, help_text="Key differentiation factors")
    
    # Strategic Recommendations
    strategic_recommendations = models.JSONField(default=list, help_text="Strategic recommendations by category")
    
    class Meta:
        verbose_name = "Competitive Analysis"
        verbose_name_plural = "Competitive Analyses"
        ordering = ['-created_at']


# Structured models for Key Individuals Analysis
class KeyIndividual(models.Model):
    """Represents an executive, leader, or advisor associated with a key individuals analysis"""
    analysis = models.ForeignKey(KeyIndividualsAnalysis, on_delete=models.CASCADE, related_name='individuals')
    is_board_member = models.BooleanField(default=False)
    name = models.CharField(max_length=255)
    role = models.CharField(max_length=255, blank=True)
    experience = models.CharField(max_length=255, blank=True)
    education = models.CharField(max_length=255, blank=True)
    credibility_score = models.IntegerField(
        validators=[MinValueValidator(0), MaxValueValidator(100)],
        null=True, blank=True
    )
    public_perception = models.IntegerField(
        validators=[MinValueValidator(0), MaxValueValidator(100)],
        null=True, blank=True
    )
    previous_companies = models.JSONField(default=list, blank=True)
    strengths = models.JSONField(default=list, blank=True)
    achievements = models.JSONField(default=list, blank=True)
    social_media = models.JSONField(default=dict, blank=True)

    def __str__(self):
        return f"{self.name} ({'Board' if self.is_board_member else 'Executive'})"


class IndividualRisk(models.Model):
    """Risks specific to a Key Individuals analysis"""
    analysis = models.ForeignKey(KeyIndividualsAnalysis, on_delete=models.CASCADE, related_name='individual_risks')
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.title


class PublicMention(models.Model):
    """Public mentions related to individuals for an analysis"""
    analysis = models.ForeignKey(KeyIndividualsAnalysis, on_delete=models.CASCADE, related_name='public_mentions')
    title = models.CharField(max_length=255)
    person = models.CharField(max_length=255, blank=True)
    source = models.CharField(max_length=255, blank=True)
    date = models.DateField(null=True, blank=True)
    summary = models.TextField(blank=True)
    sentiment = models.CharField(max_length=50, blank=True)
    url = models.URLField(blank=True)

    def __str__(self):
        return self.title


# Structured models for Competitive Analysis
class Competitor(models.Model):
    """Represents a competitor in the competitive landscape analysis"""
    
    TREND_CHOICES = [
        ('up', 'Trending Up'),
        ('down', 'Trending Down'),
        ('stable', 'Stable'),
    ]
    
    analysis = models.ForeignKey(CompetitiveAnalysis, on_delete=models.CASCADE, related_name='competitors')
    
    # Basic Information
    name = models.CharField(max_length=255, help_text="Competitor company name")
    position = models.CharField(max_length=255, blank=True, help_text="Market position description")
    logo = models.CharField(max_length=10, default='📊', help_text="Emoji or icon representation")
    
    # Company Details
    employees = models.CharField(max_length=100, blank=True, help_text="Number of employees (e.g., '100-500')")
    headquarters = models.CharField(max_length=255, blank=True, help_text="Headquarters location")
    founded = models.CharField(max_length=50, blank=True, help_text="Year founded")
    funding = models.CharField(max_length=100, blank=True, help_text="Funding amount (e.g., '$50M')")
    
    # Market Metrics
    market_share = models.CharField(max_length=50, blank=True, help_text="Market share percentage")
    revenue = models.CharField(max_length=100, blank=True, help_text="Revenue (e.g., '$10M ARR')")
    
    # Scoring and Trends
    score = models.IntegerField(
        validators=[MinValueValidator(0), MaxValueValidator(100)],
        default=0,
        help_text="Overall competitive score (0-100)"
    )
    trend = models.CharField(max_length=10, choices=TREND_CHOICES, default='stable', help_text="Market trend")
    
    # Strengths and Weaknesses (JSON for flexibility)
    strengths = models.JSONField(default=list, help_text="List of competitor strengths")
    weaknesses = models.JSONField(default=list, help_text="List of competitor weaknesses")
    
    # Ordering
    display_order = models.IntegerField(default=0, help_text="Order in which to display competitors")
    
    # Metadata
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['display_order', '-score', 'name']
        verbose_name = "Competitor"
        verbose_name_plural = "Competitors"
    
    def __str__(self):
        return f"{self.name} ({self.score}/100)"


class StrategicRecommendation(models.Model):
    """Represents a strategic recommendation category for competitive analysis"""
    
    PRIORITY_CHOICES = [
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High'),
        ('critical', 'Critical'),
    ]
    
    analysis = models.ForeignKey(CompetitiveAnalysis, on_delete=models.CASCADE, related_name='strategic_recommendation_items')
    
    # Basic Information
    category = models.CharField(max_length=255, help_text="Strategic category (e.g., 'Market Expansion', 'Product Development')")
    priority = models.CharField(max_length=20, choices=PRIORITY_CHOICES, default='medium', help_text="Priority level")
    
    # Recommendations
    recommendations = models.JSONField(default=list, help_text="List of specific recommendations for this category")
    
    # Additional details
    description = models.TextField(blank=True, help_text="Optional description of the strategic area")
    
    # Ordering
    display_order = models.IntegerField(default=0, help_text="Order in which to display recommendations")
    
    # Metadata
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['display_order', '-priority', 'category']
        verbose_name = "Strategic Recommendation"
        verbose_name_plural = "Strategic Recommendations"
    
    def __str__(self):
        return f"{self.category} ({self.get_priority_display()} Priority)"