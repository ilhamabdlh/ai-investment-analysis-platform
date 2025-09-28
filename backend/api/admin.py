from django.contrib import admin
from .models import (
    Company, CompanyTag, Analysis, Metric, Lead, Investment, UserProfile
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

@admin.register(Analysis)
class AnalysisAdmin(admin.ModelAdmin):
    list_display = ['company', 'analysis_type', 'title', 'overall_score', 'is_completed', 'analyst', 'created_at']
    list_filter = ['analysis_type', 'is_completed', 'created_at']
    search_fields = ['title', 'summary', 'company__name']
    readonly_fields = ['id', 'created_at', 'updated_at']

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
