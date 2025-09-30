from django.contrib import admin
from .models import (
    Company, CompanyTag, Metric, Lead, Investment, UserProfile,
    HighLevelAnalysis, PerceptionAnalysis, MarketAnalysis,
    KeyIndividualsAnalysis, CompetitiveAnalysis,
    KeyIndividual, IndividualRisk, PublicMention, Competitor, StrategicRecommendation
)

@admin.register(Company)
class CompanyAdmin(admin.ModelAdmin):
    list_display = ['name', 'industry', 'stage', 'founded_year', 'ai_score', 'is_active', 'created_at']
    list_filter = ['industry', 'stage', 'is_active', 'created_at']
    search_fields = ['name', 'description', 'headquarters']
    readonly_fields = ['id', 'created_at', 'updated_at']

@admin.register(CompanyTag)
class CompanyTagAdmin(admin.ModelAdmin):
    list_display = ['name', 'company']
    list_filter = ['company__industry']

# Analysis Admins for each type
@admin.register(HighLevelAnalysis)
class HighLevelAnalysisAdmin(admin.ModelAdmin):
    list_display = ['company', 'title', 'overall_score', 'is_completed', 'analyst', 'created_at']
    list_filter = ['is_completed', 'created_at']
    search_fields = ['title', 'summary', 'company__name']
    readonly_fields = ['id', 'created_at', 'updated_at']
    fieldsets = (
        (None, {
            'fields': ('company', 'title', 'summary', 'key_findings', 'risk_factors', 'opportunities', 'recommendations', 'overall_score', 'confidence_score', 'analyst', 'is_completed', 'created_at', 'updated_at')
        }),
    )

@admin.register(PerceptionAnalysis)
class PerceptionAnalysisAdmin(admin.ModelAdmin):
    list_display = ['company', 'title', 'overall_score', 'is_completed', 'analyst', 'created_at']
    list_filter = ['is_completed', 'created_at']
    search_fields = ['title', 'summary', 'company__name']
    readonly_fields = ['id', 'created_at', 'updated_at']
    fieldsets = (
        (None, {
            'fields': ('company', 'title', 'summary', 'sentiment_score', 'media_coverage', 'social_sentiment', 'brand_perception', 'overall_score', 'confidence_score', 'analyst', 'is_completed', 'created_at', 'updated_at')
        }),
    )

@admin.register(MarketAnalysis)
class MarketAnalysisAdmin(admin.ModelAdmin):
    list_display = ['company', 'title', 'overall_score', 'is_completed', 'analyst', 'created_at']
    list_filter = ['is_completed', 'created_at']
    search_fields = ['title', 'summary', 'company__name']
    readonly_fields = ['id', 'created_at', 'updated_at']
    fieldsets = (
        (None, {
            'fields': ('company', 'title', 'summary', 'market_size', 'market_growth_rate', 'competitive_landscape', 'market_trends', 'barriers_to_entry', 'overall_score', 'confidence_score', 'analyst', 'is_completed', 'created_at', 'updated_at')
        }),
    )

# Inlines for Key Individuals Analysis
class KeyIndividualInline(admin.StackedInline):
    model = KeyIndividual
    extra = 1

class IndividualRiskInline(admin.StackedInline):
    model = IndividualRisk
    extra = 1

class PublicMentionInline(admin.StackedInline):
    model = PublicMention
    extra = 1

# Inlines for Competitive Analysis
class CompetitorInline(admin.StackedInline):
    model = Competitor
    extra = 1
    fields = ('name', 'position', 'logo', 'employees', 'headquarters', 'founded', 'funding', 'market_share', 'revenue', 'score', 'trend', 'strengths', 'weaknesses', 'display_order')

class StrategicRecommendationInline(admin.StackedInline):
    model = StrategicRecommendation
    extra = 1
    fields = ('category', 'priority', 'recommendations', 'description', 'display_order')

@admin.register(KeyIndividualsAnalysis)
class KeyIndividualsAnalysisAdmin(admin.ModelAdmin):
    list_display = ['company', 'title', 'overall_score', 'is_completed', 'analyst', 'created_at']
    list_filter = ['is_completed', 'created_at']
    search_fields = ['title', 'summary', 'company__name']
    readonly_fields = ['id', 'created_at', 'updated_at']
    inlines = [KeyIndividualInline, IndividualRiskInline, PublicMentionInline]
    fieldsets = (
        (None, {
            'fields': ('company', 'title', 'summary', 'team_strength_score', 'leadership_assessment', 'team_strengths', 'team_risks', 'team_recommendations', 'overall_score', 'confidence_score', 'analyst', 'is_completed', 'created_at', 'updated_at')
        }),
    )

@admin.register(CompetitiveAnalysis)
class CompetitiveAnalysisAdmin(admin.ModelAdmin):
    list_display = ['company', 'title', 'overall_score', 'is_completed', 'analyst', 'created_at']
    list_filter = ['is_completed', 'created_at']
    search_fields = ['title', 'summary', 'company__name']
    readonly_fields = ['id', 'created_at', 'updated_at']
    inlines = [CompetitorInline, StrategicRecommendationInline]
    fieldsets = (
        ('Basic Information', {
            'fields': ('company', 'title', 'summary', 'competitive_position', 'overall_score', 'confidence_score', 'analyst', 'is_completed')
        }),
        ('Competitive Landscape (Legacy)', {
            'fields': ('competitor_analysis',),
            'description': 'Legacy JSON field - use Competitors section below instead',
            'classes': ('collapse',)
        }),
        ('SWOT Analysis', {
            'fields': ('swot_strengths', 'swot_weaknesses', 'swot_opportunities', 'swot_threats'),
            'description': 'Internal strengths/weaknesses and external opportunities/threats'
        }),
        ('Competitive Positioning', {
            'fields': ('competitive_advantages', 'competitive_threats', 'differentiation_factors'),
            'description': 'Competitive advantages, threats, and key differentiation factors'
        }),
        ('Strategic Recommendations (Legacy)', {
            'fields': ('strategic_recommendations',),
            'description': 'Legacy JSON field - use Strategic Recommendations section below instead',
            'classes': ('collapse',)
        }),
        ('Metadata', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )


@admin.register(KeyIndividual)
class KeyIndividualAdmin(admin.ModelAdmin):
    list_display = ['analysis', 'name', 'role', 'is_board_member', 'credibility_score']
    list_filter = ['is_board_member']
    search_fields = ['name', 'role', 'analysis__company__name']


@admin.register(IndividualRisk)
class IndividualRiskAdmin(admin.ModelAdmin):
    list_display = ['analysis', 'title']
    search_fields = ['title', 'analysis__company__name']


@admin.register(PublicMention)
class PublicMentionAdmin(admin.ModelAdmin):
    list_display = ['analysis', 'title', 'person', 'source', 'date', 'sentiment']
    list_filter = ['sentiment', 'date']
    search_fields = ['title', 'person', 'source', 'analysis__company__name']


@admin.register(Competitor)
class CompetitorAdmin(admin.ModelAdmin):
    list_display = ['analysis', 'name', 'score', 'trend', 'market_share', 'display_order']
    list_filter = ['trend']
    search_fields = ['name', 'position', 'analysis__company__name']
    ordering = ['display_order', '-score']
    fieldsets = (
        ('Basic Information', {
            'fields': ('analysis', 'name', 'position', 'logo', 'display_order')
        }),
        ('Company Details', {
            'fields': ('employees', 'headquarters', 'founded', 'funding')
        }),
        ('Market Metrics', {
            'fields': ('market_share', 'revenue', 'score', 'trend')
        }),
        ('Analysis', {
            'fields': ('strengths', 'weaknesses')
        }),
    )


@admin.register(StrategicRecommendation)
class StrategicRecommendationAdmin(admin.ModelAdmin):
    list_display = ['analysis', 'category', 'priority', 'display_order']
    list_filter = ['priority']
    search_fields = ['category', 'description', 'analysis__company__name']
    ordering = ['display_order', '-priority']
    fieldsets = (
        ('Basic Information', {
            'fields': ('analysis', 'category', 'priority', 'display_order')
        }),
        ('Recommendations', {
            'fields': ('recommendations', 'description'),
            'description': 'Enter recommendations as a JSON array: ["Recommendation 1", "Recommendation 2"]'
        }),
    )


@admin.register(Metric)
class MetricAdmin(admin.ModelAdmin):
    list_display = ['analysis', 'category', 'name', 'value', 'score', 'trend']
    list_filter = ['category', 'trend']

@admin.register(Lead)
class LeadAdmin(admin.ModelAdmin):
    list_display = ['company', 'status', 'priority', 'assigned_to', 'ai_match_score', 'created_at']
    list_filter = ['status', 'priority', 'created_at']
    search_fields = ['company__name', 'source', 'notes']

@admin.register(Investment)
class InvestmentAdmin(admin.ModelAdmin):
    list_display = ['company', 'amount', 'currency', 'status', 'investment_date', 'created_by']
    list_filter = ['status', 'currency', 'investment_date']
    search_fields = ['company__name']

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'role', 'created_at']
    list_filter = ['role', 'created_at']
    search_fields = ['user__username', 'user__email']
