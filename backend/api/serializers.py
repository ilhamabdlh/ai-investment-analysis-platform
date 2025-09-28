from rest_framework import serializers
from django.contrib.auth.models import User
from .models import (
    Company, CompanyTag, Analysis, Metric, Lead, Investment, UserProfile
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

class AnalysisSerializer(serializers.ModelSerializer):
    metrics = MetricSerializer(many=True, read_only=True)
    analyst_name = serializers.CharField(source='analyst.username', read_only=True)
    
    class Meta:
        model = Analysis
        fields = [
            'id', 'company', 'analysis_type', 'title', 'summary',
            'key_findings', 'risk_factors', 'opportunities', 'recommendations',
            'overall_score', 'confidence_score', 'analyst', 'analyst_name',
            'created_at', 'updated_at', 'is_completed', 'metrics'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

class AnalysisListSerializer(serializers.ModelSerializer):
    """Simplified serializer for analysis lists"""
    analyst_name = serializers.CharField(source='analyst.username', read_only=True)
    company_name = serializers.CharField(source='company.name', read_only=True)
    
    class Meta:
        model = Analysis
        fields = [
            'id', 'company', 'company_name', 'analysis_type', 'title',
            'overall_score', 'confidence_score', 'analyst_name',
            'created_at', 'is_completed'
        ]

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
    analyses = AnalysisListSerializer(many=True)
    leads = LeadSerializer(many=True)
    investments = InvestmentSerializer(many=True)
    metrics_summary = serializers.DictField()
