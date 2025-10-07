from rest_framework import serializers
from django.contrib.auth.models import User
from .models import (
    Company, CompanyTag, Metric, Lead, Investment, UserProfile,
    HighLevelAnalysis, PerceptionAnalysis, MarketAnalysis, 
    KeyIndividualsAnalysis, CompetitiveAnalysis,
    KeyIndividual, IndividualRisk, PublicMention, Competitor, StrategicRecommendation,
    SentimentBySource, CompetitorSentiment, RecentMention, KeyTopic, BrandMetric, RiskAlert,
    RevenueInformation, MarketForce, SalesChannel, IndustryTrend
)

class CompanyTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyTag
        fields = ['id', 'name']

class CompanySerializer(serializers.ModelSerializer):
    tags = CompanyTagSerializer(many=True, read_only=True)
    employee_range = serializers.ReadOnlyField()
    
    class Meta:
        model = Company
        fields = [
            'id', 'name', 'description', 'industry', 'stage', 'founded_year',
            'headquarters', 'website', 'logo_url', 'employee_range',
            'funding_raised', 'funding_currency', 'ai_score', 'ai_confidence',
            'created_at', 'updated_at', 'is_active', 'tags'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

class CompanyListSerializer(serializers.ModelSerializer):
    """Simplified serializer for company lists"""
    employee_range = serializers.ReadOnlyField()
    
    class Meta:
        model = Company
        fields = [
            'id', 'name', 'industry', 'stage', 'founded_year',
            'headquarters', 'employee_range', 'funding_raised',
            'ai_score', 'created_at'
        ]

class MetricSerializer(serializers.ModelSerializer):
    class Meta:
        model = Metric
        fields = [
            'id', 'category', 'name', 'value', 'score', 'trend', 'change_percentage'
        ]

class KeyIndividualSerializer(serializers.ModelSerializer):
    class Meta:
        model = KeyIndividual
        fields = [
            'id', 'is_board_member', 'name', 'role', 'experience', 'education',
            'credibility_score', 'public_perception', 'previous_companies',
            'strengths', 'achievements', 'social_media'
        ]

class IndividualRiskSerializer(serializers.ModelSerializer):
    class Meta:
        model = IndividualRisk
        fields = ['id', 'title', 'description']

class PublicMentionSerializer(serializers.ModelSerializer):
    class Meta:
        model = PublicMention
        fields = ['id', 'title', 'person', 'source', 'date', 'summary', 'sentiment', 'url']

class CompetitorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Competitor
        fields = [
            'id', 'name', 'position', 'logo', 'employees', 'headquarters',
            'founded', 'funding', 'market_share', 'revenue', 'score', 'trend',
            'strengths', 'weaknesses', 'display_order', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

class StrategicRecommendationSerializer(serializers.ModelSerializer):
    class Meta:
        model = StrategicRecommendation
        fields = [
            'id', 'category', 'priority', 'recommendations', 'description',
            'display_order', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

class SentimentBySourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = SentimentBySource
        fields = [
            'id', 'source_name', 'positive_percentage', 'mentions_count',
            'sentiment_label', 'change_vs_previous', 'display_order',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

class CompetitorSentimentSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompetitorSentiment
        fields = [
            'id', 'company_name', 'positive_percentage', 'mentions_count',
            'is_current_company', 'display_order', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

class RecentMentionSerializer(serializers.ModelSerializer):
    date_display = serializers.ReadOnlyField()
    
    class Meta:
        model = RecentMention
        fields = [
            'id', 'title', 'source', 'date', 'date_display', 'url', 'excerpt',
            'reach', 'engagement_level', 'sentiment_label', 'sentiment_score',
            'display_order', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'date_display', 'created_at', 'updated_at']

class KeyTopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = KeyTopic
        fields = [
            'id', 'topic_name', 'sentiment_score', 'mentions_count', 'trend',
            'description', 'display_order', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

class BrandMetricSerializer(serializers.ModelSerializer):
    benchmark_difference = serializers.ReadOnlyField()
    is_above_benchmark = serializers.ReadOnlyField()
    
    class Meta:
        model = BrandMetric
        fields = [
            'id', 'metric_name', 'current_score', 'industry_benchmark', 
            'benchmark_difference', 'is_above_benchmark', 'trend',
            'description', 'display_order', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'benchmark_difference', 'is_above_benchmark', 'created_at', 'updated_at']

class RiskAlertSerializer(serializers.ModelSerializer):
    border_color = serializers.ReadOnlyField()
    icon_color = serializers.ReadOnlyField()
    
    class Meta:
        model = RiskAlert
        fields = [
            'id', 'title', 'priority', 'description', 'impact', 'recommendation',
            'border_color', 'icon_color', 'display_order', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'border_color', 'icon_color', 'created_at', 'updated_at']

class RevenueInformationSerializer(serializers.ModelSerializer):
    date_display = serializers.ReadOnlyField()
    
    class Meta:
        model = RevenueInformation
        fields = [
            'id', 'title', 'source', 'date', 'date_display', 'url', 'revenue_figure',
            'description', 'reliability', 'growth_rate', 'display_order',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'date_display', 'created_at', 'updated_at']

class MarketForceSerializer(serializers.ModelSerializer):
    class Meta:
        model = MarketForce
        fields = [
            'id', 'force_name', 'intensity', 'score', 'description', 'factors',
            'display_order', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

class SalesChannelSerializer(serializers.ModelSerializer):
    class Meta:
        model = SalesChannel
        fields = [
            'id', 'platform_name', 'url', 'count_unit', 'installs_count', 'revenue_amount',
            'rating', 'reviews_count', 'change_percentage', 'display_order',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

class IndustryTrendSerializer(serializers.ModelSerializer):
    class Meta:
        model = IndustryTrend
        fields = [
            'id', 'title', 'impact', 'relevance', 'description', 'display_order', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

# Base analysis serializer
class BaseAnalysisSerializer(serializers.ModelSerializer):
    analyst_name = serializers.CharField(source='analyst.username', read_only=True)
    company_name = serializers.CharField(source='company.name', read_only=True)
    
    class Meta:
        fields = [
            'id', 'company', 'company_name', 'title', 'summary',
            'overall_score', 'confidence_score', 'analyst', 'analyst_name',
            'created_at', 'updated_at', 'is_completed'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

# Specific analysis serializers
class HighLevelAnalysisSerializer(BaseAnalysisSerializer):
    class Meta(BaseAnalysisSerializer.Meta):
        model = HighLevelAnalysis
        fields = BaseAnalysisSerializer.Meta.fields + [
            'key_findings', 'risk_factors', 'opportunities', 'recommendations'
        ]

class PerceptionAnalysisSerializer(BaseAnalysisSerializer):
    sentiment_sources = SentimentBySourceSerializer(many=True, read_only=True)
    competitor_sentiments = CompetitorSentimentSerializer(many=True, read_only=True)
    recent_mentions = RecentMentionSerializer(many=True, read_only=True)
    key_topics = KeyTopicSerializer(many=True, read_only=True)
    brand_metrics = BrandMetricSerializer(many=True, read_only=True)
    risk_alerts = RiskAlertSerializer(many=True, read_only=True)
    
    class Meta(BaseAnalysisSerializer.Meta):
        model = PerceptionAnalysis
        fields = BaseAnalysisSerializer.Meta.fields + [
            'sentiment_score', 'sentiment_sources', 'competitor_sentiments', 'recent_mentions', 
            'key_topics', 'brand_metrics', 'risk_alerts', 
            'social_sentiment', 'brand_perception', 'risk_factors'
        ]

class MarketAnalysisSerializer(BaseAnalysisSerializer):
    revenue_information = RevenueInformationSerializer(many=True, read_only=True)
    market_forces = MarketForceSerializer(many=True, read_only=True)
    sales_channels = SalesChannelSerializer(many=True, read_only=True)
    industry_trends_items = IndustryTrendSerializer(many=True, read_only=True)
    
    class Meta(BaseAnalysisSerializer.Meta):
        model = MarketAnalysis
        fields = BaseAnalysisSerializer.Meta.fields + [
            'market_size', 'market_growth_rate', 'revenue_information', 'market_forces', 'sales_channels', 'industry_trends_items',
            'competitive_landscape', 'market_trends', 'barriers_to_entry'
        ]

class KeyIndividualsAnalysisSerializer(BaseAnalysisSerializer):
    individuals = KeyIndividualSerializer(many=True, read_only=True)
    individual_risks = IndividualRiskSerializer(many=True, read_only=True)
    public_mentions = PublicMentionSerializer(many=True, read_only=True)
    
    class Meta(BaseAnalysisSerializer.Meta):
        model = KeyIndividualsAnalysis
        fields = BaseAnalysisSerializer.Meta.fields + [
            'team_strength_score', 'leadership_assessment', 'team_strengths',
            'team_risks', 'team_recommendations', 'individuals', 'individual_risks', 'public_mentions'
        ]

class CompetitiveAnalysisSerializer(BaseAnalysisSerializer):
    competitors = CompetitorSerializer(many=True, read_only=True)
    strategic_recommendation_items = StrategicRecommendationSerializer(many=True, read_only=True)
    
    class Meta(BaseAnalysisSerializer.Meta):
        model = CompetitiveAnalysis
        fields = BaseAnalysisSerializer.Meta.fields + [
            'competitive_position', 'competitor_analysis', 'competitors',
            'swot_strengths', 'swot_weaknesses', 'swot_opportunities', 'swot_threats',
            'competitive_advantages', 'competitive_threats', 'differentiation_factors',
            'strategic_recommendations', 'strategic_recommendation_items'
        ]

# List serializers for each analysis type
class HighLevelAnalysisListSerializer(serializers.ModelSerializer):
    analyst_name = serializers.CharField(source='analyst.username', read_only=True)
    company_name = serializers.CharField(source='company.name', read_only=True)
    analysis_type = serializers.SerializerMethodField()
    
    class Meta:
        model = HighLevelAnalysis
        fields = [
            'id', 'company', 'company_name', 'title',
            'overall_score', 'confidence_score', 'analyst_name',
            'created_at', 'is_completed', 'analysis_type'
        ]
    
    def get_analysis_type(self, obj):
        return 'high-level'

class PerceptionAnalysisListSerializer(serializers.ModelSerializer):
    analyst_name = serializers.CharField(source='analyst.username', read_only=True)
    company_name = serializers.CharField(source='company.name', read_only=True)
    analysis_type = serializers.SerializerMethodField()
    
    class Meta:
        model = PerceptionAnalysis
        fields = [
            'id', 'company', 'company_name', 'title',
            'overall_score', 'confidence_score', 'analyst_name',
            'created_at', 'is_completed', 'analysis_type'
        ]
    
    def get_analysis_type(self, obj):
        return 'perception'

class MarketAnalysisListSerializer(serializers.ModelSerializer):
    analyst_name = serializers.CharField(source='analyst.username', read_only=True)
    company_name = serializers.CharField(source='company.name', read_only=True)
    analysis_type = serializers.SerializerMethodField()
    
    class Meta:
        model = MarketAnalysis
        fields = [
            'id', 'company', 'company_name', 'title',
            'overall_score', 'confidence_score', 'analyst_name',
            'created_at', 'is_completed', 'analysis_type'
        ]
    
    def get_analysis_type(self, obj):
        return 'market'

class KeyIndividualsAnalysisListSerializer(serializers.ModelSerializer):
    analyst_name = serializers.CharField(source='analyst.username', read_only=True)
    company_name = serializers.CharField(source='company.name', read_only=True)
    analysis_type = serializers.SerializerMethodField()
    
    class Meta:
        model = KeyIndividualsAnalysis
        fields = [
            'id', 'company', 'company_name', 'title',
            'overall_score', 'confidence_score', 'analyst_name',
            'created_at', 'is_completed', 'analysis_type'
        ]
    
    def get_analysis_type(self, obj):
        return 'individuals'

class CompetitiveAnalysisListSerializer(serializers.ModelSerializer):
    analyst_name = serializers.CharField(source='analyst.username', read_only=True)
    company_name = serializers.CharField(source='company.name', read_only=True)
    analysis_type = serializers.SerializerMethodField()
    
    class Meta:
        model = CompetitiveAnalysis
        fields = [
            'id', 'company', 'company_name', 'title',
            'overall_score', 'confidence_score', 'analyst_name',
            'created_at', 'is_completed', 'analysis_type'
        ]
    
    def get_analysis_type(self, obj):
        return 'competitive'

class LeadSerializer(serializers.ModelSerializer):
    company_name = serializers.CharField(source='company.name', read_only=True)
    company_industry = serializers.CharField(source='company.industry', read_only=True)
    company_stage = serializers.CharField(source='company.stage', read_only=True)
    assigned_to_name = serializers.CharField(source='assigned_to.username', read_only=True)
    
    class Meta:
        model = Lead
        fields = [
            'id', 'company', 'company_name', 'company_industry', 'company_stage',
            'status', 'priority', 'assigned_to', 'assigned_to_name', 'source',
            'notes', 'ai_match_score', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

class InvestmentSerializer(serializers.ModelSerializer):
    company_name = serializers.CharField(source='company.name', read_only=True)
    created_by_name = serializers.CharField(source='created_by.username', read_only=True)
    
    class Meta:
        model = Investment
        fields = [
            'id', 'company', 'company_name', 'lead', 'amount', 'currency',
            'equity_percentage', 'valuation', 'investment_date', 'status',
            'created_by', 'created_by_name', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

class UserProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    email = serializers.CharField(source='user.email', read_only=True)
    first_name = serializers.CharField(source='user.first_name', read_only=True)
    last_name = serializers.CharField(source='user.last_name', read_only=True)
    
    class Meta:
        model = UserProfile
        fields = [
            'id', 'user', 'username', 'email', 'first_name', 'last_name',
            'role', 'preferred_industries', 'notification_preferences',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

class DashboardStatsSerializer(serializers.Serializer):
    """Serializer for dashboard statistics"""
    active_prospects = serializers.IntegerField()
    investment_pipeline = serializers.DecimalField(max_digits=15, decimal_places=2)
    analysis_completed = serializers.IntegerField()
    success_rate = serializers.FloatField()
    new_companies_this_week = serializers.IntegerField()
    avg_match_score = serializers.FloatField()
    hot_leads = serializers.IntegerField()

class CompanyAnalysisSerializer(serializers.Serializer):
    """Serializer for comprehensive company analysis"""
    company = CompanySerializer()
    # Include all analysis types
    high_level_analyses = HighLevelAnalysisSerializer(many=True)
    perception_analyses = PerceptionAnalysisSerializer(many=True)
    market_analyses = MarketAnalysisSerializer(many=True)
    key_individuals_analyses = KeyIndividualsAnalysisSerializer(many=True)
    competitive_analyses = CompetitiveAnalysisSerializer(many=True)
    leads = LeadSerializer(many=True)
    investments = InvestmentSerializer(many=True)
    metrics_summary = serializers.DictField()
