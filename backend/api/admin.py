from django.contrib import admin
from .models import (
    Company, CompanyTag, Metric, Lead, Investment, UserProfile,
    HighLevelAnalysis, PerceptionAnalysis, MarketAnalysis,
    KeyIndividualsAnalysis, CompetitiveAnalysis,
    KeyIndividual, IndividualRisk, PublicMention, Competitor, StrategicRecommendation,
    SentimentBySource, CompetitorSentiment, RecentMention, KeyTopic, BrandMetric, RiskAlert
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

# Inlines for Perception Analysis (defined before use)
class SentimentBySourceInline(admin.TabularInline):
    model = SentimentBySource
    extra = 1
    fields = ('source_name', 'positive_percentage', 'mentions_count', 'sentiment_label', 'change_vs_previous', 'display_order')

class CompetitorSentimentInline(admin.TabularInline):
    model = CompetitorSentiment
    extra = 1
    fields = ('company_name', 'positive_percentage', 'mentions_count', 'is_current_company', 'display_order')

class RecentMentionInline(admin.StackedInline):
    model = RecentMention
    extra = 1
    fields = ('title', 'source', 'date', 'url', 'excerpt', 'reach', 'engagement_level', 'sentiment_label', 'sentiment_score', 'display_order')

class KeyTopicInline(admin.TabularInline):
    model = KeyTopic
    extra = 1
    fields = ('topic_name', 'sentiment_score', 'mentions_count', 'trend', 'description', 'display_order')

class BrandMetricInline(admin.TabularInline):
    model = BrandMetric
    extra = 1
    fields = ('metric_name', 'current_score', 'industry_benchmark', 'trend', 'description', 'display_order')

class RiskAlertInline(admin.StackedInline):
    model = RiskAlert
    extra = 1
    fields = ('title', 'priority', 'description', 'impact', 'recommendation', 'display_order')

@admin.register(PerceptionAnalysis)
class PerceptionAnalysisAdmin(admin.ModelAdmin):
    list_display = ['company', 'title', 'overall_score', 'sentiment_score', 'is_completed', 'analyst', 'created_at']
    list_filter = ['is_completed', 'created_at']
    search_fields = ['title', 'summary', 'company__name']
    readonly_fields = ['id', 'created_at', 'updated_at']
    inlines = [SentimentBySourceInline, CompetitorSentimentInline, RecentMentionInline, KeyTopicInline, BrandMetricInline, RiskAlertInline]
    fieldsets = (
        ('Basic Information', {
            'fields': ('company', 'title', 'summary', 'overall_score', 'confidence_score', 'sentiment_score', 'analyst', 'is_completed')
        }),
        ('Legacy JSON Fields (Deprecated)', {
            'fields': ('social_sentiment', 'brand_perception', 'risk_factors'),
            'classes': ('collapse',),
            'description': 'These fields are deprecated. Use the structured sections below instead.'
        }),
        ('Metadata', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
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


@admin.register(SentimentBySource)
class SentimentBySourceAdmin(admin.ModelAdmin):
    list_display = ['analysis', 'source_name', 'positive_percentage', 'mentions_count', 'sentiment_label', 'display_order']
    list_filter = ['source_name', 'sentiment_label']
    search_fields = ['source_name', 'analysis__company__name']
    ordering = ['display_order', '-positive_percentage']


@admin.register(CompetitorSentiment)
class CompetitorSentimentAdmin(admin.ModelAdmin):
    list_display = ['analysis', 'company_name', 'positive_percentage', 'mentions_count', 'is_current_company', 'display_order']
    list_filter = ['is_current_company']
    search_fields = ['company_name', 'analysis__company__name']
    ordering = ['display_order', '-positive_percentage']


@admin.register(RecentMention)
class RecentMentionAdmin(admin.ModelAdmin):
    list_display = ['title', 'source', 'date', 'sentiment_label', 'sentiment_score', 'engagement_level', 'display_order']
    list_filter = ['source', 'sentiment_label', 'engagement_level', 'date']
    search_fields = ['title', 'source', 'excerpt', 'analysis__company__name']
    ordering = ['display_order', '-date']
    date_hierarchy = 'date'
    fieldsets = (
        ('Basic Information', {
            'fields': ('analysis', 'title', 'source', 'date', 'url', 'display_order')
        }),
        ('Content', {
            'fields': ('excerpt',)
        }),
        ('Engagement Metrics', {
            'fields': ('reach', 'engagement_level')
        }),
        ('Sentiment', {
            'fields': ('sentiment_label', 'sentiment_score')
        }),
    )


@admin.register(KeyTopic)
class KeyTopicAdmin(admin.ModelAdmin):
    list_display = ['topic_name', 'analysis', 'sentiment_score', 'mentions_count', 'trend', 'display_order']
    list_filter = ['trend', 'sentiment_score']
    search_fields = ['topic_name', 'description', 'analysis__company__name']
    ordering = ['display_order', '-sentiment_score']
    fieldsets = (
        ('Basic Information', {
            'fields': ('analysis', 'topic_name', 'display_order')
        }),
        ('Sentiment Metrics', {
            'fields': ('sentiment_score', 'mentions_count', 'trend')
        }),
        ('Additional Details', {
            'fields': ('description',),
            'classes': ('collapse',)
        }),
    )


@admin.register(BrandMetric)
class BrandMetricAdmin(admin.ModelAdmin):
    list_display = ['metric_name', 'analysis', 'current_score', 'industry_benchmark', 'benchmark_difference', 'trend', 'display_order']
    list_filter = ['trend', 'current_score']
    search_fields = ['metric_name', 'description', 'analysis__company__name']
    ordering = ['display_order', '-current_score']
    readonly_fields = ['benchmark_difference', 'is_above_benchmark']
    fieldsets = (
        ('Basic Information', {
            'fields': ('analysis', 'metric_name', 'display_order')
        }),
        ('Scores & Benchmark', {
            'fields': ('current_score', 'industry_benchmark', 'benchmark_difference', 'is_above_benchmark', 'trend')
        }),
        ('Additional Details', {
            'fields': ('description',),
            'classes': ('collapse',)
        }),
    )


@admin.register(RiskAlert)
class RiskAlertAdmin(admin.ModelAdmin):
    list_display = ['title', 'analysis', 'priority', 'display_order']
    list_filter = ['priority']
    search_fields = ['title', 'description', 'impact', 'recommendation', 'analysis__company__name']
    ordering = ['display_order', '-priority']
    readonly_fields = ['border_color', 'icon_color']
    fieldsets = (
        ('Basic Information', {
            'fields': ('analysis', 'title', 'priority', 'display_order')
        }),
        ('Risk Details', {
            'fields': ('description', 'impact', 'recommendation')
        }),
        ('Display Properties (Read-only)', {
            'fields': ('border_color', 'icon_color'),
            'classes': ('collapse',)
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
