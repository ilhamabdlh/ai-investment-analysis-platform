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
    
    # Legacy JSON fields (deprecated - use structured models below)
    social_sentiment = models.JSONField(
        default=list, 
        blank=True,
        help_text='DEPRECATED: Use structured models instead. Array of key topics with sentiment'
    )
    brand_perception = models.JSONField(
        default=list, 
        blank=True,
        help_text='DEPRECATED: Use structured models instead. Array of brand metrics'
    )
    risk_factors = models.JSONField(
        default=list, 
        blank=True,
        help_text='DEPRECATED: Use structured models instead. Array of risk alerts'
    )
    
    class Meta:
        verbose_name = "Perception Analysis"
        verbose_name_plural = "Perception Analyses"
        ordering = ['-created_at']


# Structured models for Perception Analysis

class SentimentBySource(models.Model):
    """Sentiment breakdown by source (e.g., News Media, Social Media, etc.)"""
    
    analysis = models.ForeignKey(PerceptionAnalysis, on_delete=models.CASCADE, related_name='sentiment_sources')
    
    # Source information
    source_name = models.CharField(max_length=255, help_text="Source name (e.g., 'News Media', 'Social Media')")
    
    # Sentiment metrics
    positive_percentage = models.IntegerField(
        validators=[MinValueValidator(0), MaxValueValidator(100)],
        help_text="Percentage of mentions that are positive (0-100)"
    )
    mentions_count = models.IntegerField(
        validators=[MinValueValidator(0)],
        help_text="Total number of mentions from this source"
    )
    
    # Additional context
    sentiment_label = models.CharField(
        max_length=50, 
        blank=True,
        help_text="Human-readable sentiment label (e.g., 'Positive', 'Neutral-Positive')"
    )
    change_vs_previous = models.CharField(
        max_length=50,
        blank=True,
        help_text="Change indicator (e.g., '+12% vs last month')"
    )
    
    # Ordering
    display_order = models.IntegerField(default=0, help_text="Order in which to display sources")
    
    # Metadata
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['display_order', '-positive_percentage', 'source_name']
        verbose_name = "Sentiment by Source"
        verbose_name_plural = "Sentiment by Sources"
    
    def __str__(self):
        return f"{self.source_name}: {self.positive_percentage}% positive ({self.mentions_count} mentions)"


class CompetitorSentiment(models.Model):
    """Competitor sentiment comparison data"""
    
    analysis = models.ForeignKey(PerceptionAnalysis, on_delete=models.CASCADE, related_name='competitor_sentiments')
    
    # Competitor information
    company_name = models.CharField(max_length=255, help_text="Competitor company name")
    
    # Sentiment metrics
    positive_percentage = models.IntegerField(
        validators=[MinValueValidator(0), MaxValueValidator(100)],
        help_text="Percentage of mentions that are positive (0-100)"
    )
    mentions_count = models.IntegerField(
        validators=[MinValueValidator(0)],
        help_text="Total number of mentions"
    )
    
    # Highlighting
    is_current_company = models.BooleanField(
        default=False,
        help_text="Is this the company being analyzed (for highlighting)"
    )
    
    # Ordering
    display_order = models.IntegerField(default=0, help_text="Order in which to display competitors")
    
    # Metadata
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['display_order', '-positive_percentage', 'company_name']
        verbose_name = "Competitor Sentiment"
        verbose_name_plural = "Competitor Sentiments"
    
    def __str__(self):
        marker = " (Current)" if self.is_current_company else ""
        return f"{self.company_name}{marker}: {self.positive_percentage}% positive ({self.mentions_count} mentions)"


class RecentMention(models.Model):
    """Recent media mentions, news articles, and social media posts about the company"""
    
    ENGAGEMENT_CHOICES = [
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High'),
        ('very_high', 'Very High'),
    ]
    
    analysis = models.ForeignKey(PerceptionAnalysis, on_delete=models.CASCADE, related_name='recent_mentions')
    
    # Mention details
    title = models.CharField(max_length=500, help_text="Title of the article/mention")
    source = models.CharField(max_length=255, help_text="Source (e.g., 'TechCrunch', 'LinkedIn', 'Twitter')")
    date = models.DateField(help_text="Publication date")
    url = models.URLField(blank=True, help_text="Link to the original article/post")
    
    # Content
    excerpt = models.TextField(help_text="Brief excerpt or summary of the mention")
    
    # Engagement metrics
    reach = models.CharField(
        max_length=50,
        blank=True,
        help_text="Reach metric (e.g., '2.3M', '156K')"
    )
    engagement_level = models.CharField(
        max_length=20,
        choices=ENGAGEMENT_CHOICES,
        default='medium',
        help_text="Engagement level"
    )
    
    # Sentiment analysis
    sentiment_label = models.CharField(
        max_length=50,
        help_text="Sentiment label (e.g., 'Positive', 'Very Positive', 'Neutral-Positive')"
    )
    sentiment_score = models.IntegerField(
        validators=[MinValueValidator(0), MaxValueValidator(100)],
        help_text="Sentiment score (0-100)"
    )
    
    # Ordering
    display_order = models.IntegerField(default=0, help_text="Order in which to display mentions")
    
    # Metadata
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['display_order', '-date', '-sentiment_score']
        verbose_name = "Recent Mention"
        verbose_name_plural = "Recent Mentions"
    
    def __str__(self):
        return f"{self.title} - {self.source} ({self.sentiment_label})"
    
    @property
    def date_display(self):
        """Return a human-readable date (e.g., '2 days ago')"""
        from django.utils import timezone
        from datetime import timedelta
        
        today = timezone.now().date()
        delta = today - self.date
        
        if delta.days == 0:
            return "Today"
        elif delta.days == 1:
            return "Yesterday"
        elif delta.days < 7:
            return f"{delta.days} days ago"
        elif delta.days < 30:
            weeks = delta.days // 7
            return f"{weeks} week{'s' if weeks > 1 else ''} ago"
        elif delta.days < 365:
            months = delta.days // 30
            return f"{months} month{'s' if months > 1 else ''} ago"
        else:
            return self.date.strftime("%b %d, %Y")


class KeyTopic(models.Model):
    """Key topics being discussed about the company (e.g., Innovation, Leadership, Product Quality)"""
    
    TREND_CHOICES = [
        ('up', 'Trending Up'),
        ('down', 'Trending Down'),
        ('stable', 'Stable'),
    ]
    
    analysis = models.ForeignKey(PerceptionAnalysis, on_delete=models.CASCADE, related_name='key_topics')
    
    # Topic details
    topic_name = models.CharField(max_length=255, help_text="Topic name (e.g., 'Innovation', 'Leadership', 'Product Quality')")
    
    # Sentiment metrics
    sentiment_score = models.IntegerField(
        validators=[MinValueValidator(0), MaxValueValidator(100)],
        help_text="Sentiment score for this topic (0-100)"
    )
    mentions_count = models.IntegerField(
        validators=[MinValueValidator(0)],
        help_text="Number of mentions for this topic"
    )
    
    # Trend indicator
    trend = models.CharField(
        max_length=10,
        choices=TREND_CHOICES,
        default='stable',
        help_text="Trend direction"
    )
    
    # Optional description
    description = models.TextField(
        blank=True,
        help_text="Optional description or context about this topic"
    )
    
    # Ordering
    display_order = models.IntegerField(default=0, help_text="Order in which to display topics")
    
    # Metadata
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['display_order', '-sentiment_score', 'topic_name']
        verbose_name = "Key Topic"
        verbose_name_plural = "Key Topics"
    
    def __str__(self):
        trend_icon = "↑" if self.trend == "up" else "↓" if self.trend == "down" else "→"
        return f"{self.topic_name}: {self.sentiment_score}% ({self.mentions_count} mentions) {trend_icon}"


class BrandMetric(models.Model):
    """Brand perception metrics with benchmark comparisons"""
    
    TREND_CHOICES = [
        ('up', 'Trending Up'),
        ('down', 'Trending Down'),
        ('stable', 'Stable'),
    ]
    
    analysis = models.ForeignKey(PerceptionAnalysis, on_delete=models.CASCADE, related_name='brand_metrics')
    
    # Metric details
    metric_name = models.CharField(
        max_length=255, 
        help_text="Metric name (e.g., 'Brand Awareness', 'Brand Trust', 'Innovation Perception')"
    )
    
    # Score and benchmark
    current_score = models.IntegerField(
        validators=[MinValueValidator(0), MaxValueValidator(100)],
        help_text="Current score for this metric (0-100)"
    )
    industry_benchmark = models.IntegerField(
        validators=[MinValueValidator(0), MaxValueValidator(100)],
        help_text="Industry benchmark score (0-100)"
    )
    
    # Trend indicator
    trend = models.CharField(
        max_length=10,
        choices=TREND_CHOICES,
        default='stable',
        help_text="Trend direction over time"
    )
    
    # Optional description
    description = models.TextField(
        blank=True,
        help_text="Optional description or context about this metric"
    )
    
    # Ordering
    display_order = models.IntegerField(default=0, help_text="Order in which to display metrics")
    
    # Metadata
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['display_order', '-current_score', 'metric_name']
        verbose_name = "Brand Metric"
        verbose_name_plural = "Brand Metrics"
    
    def __str__(self):
        diff = self.current_score - self.industry_benchmark
        comparison = f"+{diff}" if diff > 0 else str(diff)
        trend_icon = "↑" if self.trend == "up" else "↓" if self.trend == "down" else "→"
        return f"{self.metric_name}: {self.current_score} ({comparison} vs benchmark) {trend_icon}"
    
    @property
    def benchmark_difference(self):
        """Calculate difference from benchmark"""
        return self.current_score - self.industry_benchmark
    
    @property
    def is_above_benchmark(self):
        """Check if score is above benchmark"""
        return self.current_score > self.industry_benchmark


class RiskAlert(models.Model):
    """Risk alerts and concerns about public perception"""
    
    PRIORITY_CHOICES = [
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High'),
        ('critical', 'Critical'),
    ]
    
    analysis = models.ForeignKey(PerceptionAnalysis, on_delete=models.CASCADE, related_name='risk_alerts')
    
    # Alert details
    title = models.CharField(max_length=500, help_text="Risk alert title")
    
    # Priority
    priority = models.CharField(
        max_length=20,
        choices=PRIORITY_CHOICES,
        default='medium',
        help_text="Risk priority level"
    )
    
    # Description and context
    description = models.TextField(help_text="Detailed description of the risk")
    
    # Impact and recommendation
    impact = models.TextField(
        blank=True,
        help_text="Potential impact if not addressed"
    )
    recommendation = models.TextField(
        blank=True,
        help_text="Recommended actions to mitigate the risk"
    )
    
    # Ordering
    display_order = models.IntegerField(default=0, help_text="Order in which to display risk alerts")
    
    # Metadata
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['display_order', '-priority', 'title']
        verbose_name = "Risk Alert"
        verbose_name_plural = "Risk Alerts"
    
    def __str__(self):
        priority_display = self.get_priority_display()
        return f"{self.title} ({priority_display} Priority)"
    
    @property
    def border_color(self):
        """Get border color based on priority"""
        colors = {
            'critical': 'red',
            'high': 'red',
            'medium': 'yellow',
            'low': 'blue',
        }
        return colors.get(self.priority, 'yellow')
    
    @property
    def icon_color(self):
        """Get icon color based on priority"""
        return self.border_color


class MarketAnalysis(Analysis):
    """Market analysis and competitive landscape"""
    
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='market_analyses')
    
    # Market specific fields
    market_size = models.CharField(max_length=255, blank=True, help_text="Total addressable market size")
    market_growth_rate = models.FloatField(null=True, blank=True, help_text="Market growth rate percentage")
    revenue_note = models.TextField(blank=True, help_text="Notes/caveats about revenue figures (e.g., year range, estimates)")
    
    # Legacy JSON fields (deprecated - use structured models below)
    competitive_landscape = models.JSONField(
        default=list, 
        blank=True,
        help_text="DEPRECATED: Use structured models instead. Competitive landscape analysis"
    )
    market_trends = models.JSONField(
        default=list, 
        blank=True,
        help_text="DEPRECATED: Use structured models instead. Current market trends"
    )
    barriers_to_entry = models.JSONField(
        default=list, 
        blank=True,
        help_text="DEPRECATED: Use structured models instead. Barriers to market entry"
    )
    
    class Meta:
        verbose_name = "Market Analysis"
        verbose_name_plural = "Market Analyses"
        ordering = ['-created_at']


# Structured models for Market Analysis

class RevenueInformation(models.Model):
    """Publicly available revenue information and financial data points"""
    
    RELIABILITY_CHOICES = [
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High'),
        ('verified', 'Verified'),
    ]
    
    analysis = models.ForeignKey(MarketAnalysis, on_delete=models.CASCADE, related_name='revenue_information')
    
    # Information details
    title = models.CharField(max_length=500, help_text="Title describing the revenue information")
    source = models.CharField(max_length=255, help_text="Source (e.g., 'Annual Report', 'TechCrunch', 'Investor Deck')")
    date = models.DateField(help_text="Date of publication or report")
    url = models.URLField(blank=True, help_text="Link to the original source")
    
    # Revenue data
    revenue_figure = models.CharField(
        max_length=100,
        help_text="Revenue figure (e.g., '$10M ARR', '$50M Series A')"
    )
    description = models.TextField(help_text="Details and context about this revenue information")
    
    # Reliability and confidence
    reliability = models.CharField(
        max_length=20,
        choices=RELIABILITY_CHOICES,
        default='medium',
        help_text="Reliability/confidence level of this information"
    )
    
    # Metrics (optional)
    growth_rate = models.CharField(
        max_length=50,
        blank=True,
        help_text="Growth rate if mentioned (e.g., '+125% YoY')"
    )
    
    # Ordering
    display_order = models.IntegerField(default=0, help_text="Order in which to display revenue items")
    
    # Metadata
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['display_order', '-date']
        verbose_name = "Revenue Information"
        verbose_name_plural = "Revenue Information"
    
    def __str__(self):
        return f"{self.title} - {self.revenue_figure} ({self.source})"
    
    @property
    def date_display(self):
        """Return a human-readable date"""
        from django.utils import timezone
        
        today = timezone.now().date()
        delta = today - self.date
        
        if delta.days == 0:
            return "Today"
        elif delta.days == 1:
            return "Yesterday"
        elif delta.days < 7:
            return f"{delta.days} days ago"
        elif delta.days < 30:
            weeks = delta.days // 7
            return f"{weeks} week{'s' if weeks > 1 else ''} ago"
        elif delta.days < 365:
            months = delta.days // 30
            return f"{months} month{'s' if months > 1 else ''} ago"
        else:
            return self.date.strftime("%b %d, %Y")


class MarketForce(models.Model):
    """Porter's Five Forces style market dynamics for a market analysis"""

    INTENSITY_CHOICES = [
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High'),
    ]

    analysis = models.ForeignKey(MarketAnalysis, on_delete=models.CASCADE, related_name='market_forces')

    # Force details
    force_name = models.CharField(max_length=255, help_text="Force name (e.g., 'Competitive Rivalry')")
    intensity = models.CharField(max_length=10, choices=INTENSITY_CHOICES, default='medium')
    score = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(100)], help_text="Force intensity score (0-100)")
    description = models.TextField(blank=True, help_text="Summary of the force dynamics")
    factors = models.JSONField(default=list, help_text="Key factors list")

    # Ordering
    display_order = models.IntegerField(default=0, help_text="Order in which to display market forces")

    # Metadata
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['display_order', '-score', 'force_name']
        verbose_name = "Market Force"
        verbose_name_plural = "Market Forces"

    def __str__(self):
        return f"{self.force_name} ({self.get_intensity_display()})"


class SalesChannel(models.Model):
    """Sales and distribution channels for the product (App stores, Direct, Partners)"""

    analysis = models.ForeignKey(MarketAnalysis, on_delete=models.CASCADE, related_name='sales_channels')

    platform_name = models.CharField(max_length=255, help_text="Platform or channel name (e.g., App Store, Direct Sales)")
    url = models.URLField(blank=True)

    count_unit = models.CharField(max_length=50, blank=True, help_text="Unit for count metric (e.g., 'Installs', 'Transactions', 'Products')")
    installs_count = models.CharField(max_length=50, blank=True, help_text="Primary count for this channel (e.g., '120K')")
    revenue_amount = models.CharField(max_length=50, blank=True, help_text="Revenue amount for the channel")
    rating = models.FloatField(null=True, blank=True)
    reviews_count = models.IntegerField(null=True, blank=True)
    change_percentage = models.FloatField(null=True, blank=True)

    display_order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['display_order', '-updated_at', 'platform_name']
        verbose_name = "Sales Channel"
        verbose_name_plural = "Sales Channels"

    def __str__(self):
        return self.platform_name


class IndustryTrend(models.Model):
    """Structured industry trend items for the Industry Trends tab"""

    IMPACT_CHOICES = [
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High'),
    ]

    analysis = models.ForeignKey(MarketAnalysis, on_delete=models.CASCADE, related_name='industry_trends_items')

    title = models.CharField(max_length=255, help_text="Trend title")
    impact = models.CharField(max_length=10, choices=IMPACT_CHOICES, default='medium')
    relevance = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(100)], help_text="Relevance score (0-100)")
    description = models.TextField(blank=True)

    display_order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['display_order', '-relevance', 'title']
        verbose_name = "Industry Trend"
        verbose_name_plural = "Industry Trends"

    def __str__(self):
        return self.title

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