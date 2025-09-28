from django.db import models
from django.contrib.auth.models import User
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
    """Investment analysis for a company"""
    
    ANALYSIS_TYPES = [
        ('high-level', 'High-Level Analysis'),
        ('perception', 'Perception Analysis'),
        ('market', 'Market Analysis'),
        ('individuals', 'Key Individuals Analysis'),
        ('competitive', 'Competitive Analysis'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='analyses')
    analysis_type = models.CharField(max_length=50, choices=ANALYSIS_TYPES)
    title = models.CharField(max_length=255)
    
    # Analysis Content
    summary = models.TextField()
    key_findings = models.JSONField(default=list)
    risk_factors = models.JSONField(default=list)
    opportunities = models.JSONField(default=list)
    recommendations = models.JSONField(default=list)
    
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
        verbose_name_plural = "Analyses"
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.company.name} - {self.get_analysis_type_display()}"

class Metric(models.Model):
    """Metrics for company analysis"""
    
    CATEGORIES = [
        ('financial', 'Financial Health'),
        ('market', 'Market Position'),
        ('team', 'Team & Execution'),
        ('technology', 'Technology & IP'),
        ('growth', 'Growth Potential'),
        ('risk', 'Risk Assessment'),
    ]
    
    analysis = models.ForeignKey(Analysis, on_delete=models.CASCADE, related_name='metrics')
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
        return f"{self.analysis.company.name} - {self.name}: {self.value}"

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
