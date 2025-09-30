from rest_framework import viewsets, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
# from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Count, Avg, Sum, Q
from django.contrib.auth.models import User
from datetime import datetime, timedelta

from .models import (
    Company, CompanyTag, Metric, Lead, Investment, UserProfile,
    HighLevelAnalysis, PerceptionAnalysis, MarketAnalysis,
    KeyIndividualsAnalysis, CompetitiveAnalysis
)
from .serializers import (
    CompanySerializer, CompanyListSerializer, CompanyTagSerializer,
    HighLevelAnalysisSerializer, HighLevelAnalysisListSerializer,
    PerceptionAnalysisSerializer, PerceptionAnalysisListSerializer,
    MarketAnalysisSerializer, MarketAnalysisListSerializer,
    KeyIndividualsAnalysisSerializer, KeyIndividualsAnalysisListSerializer,
    CompetitiveAnalysisSerializer, CompetitiveAnalysisListSerializer,
    MetricSerializer, LeadSerializer, InvestmentSerializer, UserProfileSerializer,
    DashboardStatsSerializer, CompanyAnalysisSerializer
)

class CompanyViewSet(viewsets.ModelViewSet):
    """ViewSet for managing companies"""
    queryset = Company.objects.filter(is_active=True)
    permission_classes = [IsAuthenticated]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    # filterset_fields = ['industry', 'stage', 'founded_year']  # Requires django-filter
    search_fields = ['name', 'description', 'headquarters']
    ordering_fields = ['name', 'created_at', 'updated_at', 'ai_score']
    ordering = ['-updated_at']
    
    def get_serializer_class(self):
        if self.action == 'list':
            return CompanyListSerializer
        return CompanySerializer
    
    @action(detail=True, methods=['get'])
    def full_analysis(self, request, pk=None):
        """Get comprehensive analysis for a company"""
        company = self.get_object()
        
        # Get all analysis types
        high_level_analyses = HighLevelAnalysis.objects.filter(company=company).order_by('-created_at')
        perception_analyses = PerceptionAnalysis.objects.filter(company=company).order_by('-created_at')
        market_analyses = MarketAnalysis.objects.filter(company=company).order_by('-created_at')
        key_individuals_analyses = KeyIndividualsAnalysis.objects.filter(company=company).order_by('-created_at')
        competitive_analyses = CompetitiveAnalysis.objects.filter(company=company).order_by('-created_at')
        
        leads = Lead.objects.filter(company=company).order_by('-created_at')
        investments = Investment.objects.filter(company=company).order_by('-investment_date')
        
        # Calculate metrics summary
        all_analyses = list(high_level_analyses) + list(perception_analyses) + list(market_analyses) + list(key_individuals_analyses) + list(competitive_analyses)
        metrics_summary = {
            'total_analyses': len(all_analyses),
            'avg_score': sum(a.overall_score or 0 for a in all_analyses) / len(all_analyses) if all_analyses else 0,
            'avg_confidence': sum(a.confidence_score or 0 for a in all_analyses) / len(all_analyses) if all_analyses else 0,
            'total_investment': investments.aggregate(total=Sum('amount'))['total'] or 0,
            'lead_status_breakdown': dict(leads.values('status').annotate(count=Count('status')).values_list('status', 'count'))
        }
        
        serializer = CompanyAnalysisSerializer({
            'company': company,
            'high_level_analyses': high_level_analyses,
            'perception_analyses': perception_analyses,
            'market_analyses': market_analyses,
            'key_individuals_analyses': key_individuals_analyses,
            'competitive_analyses': competitive_analyses,
            'leads': leads,
            'investments': investments,
            'metrics_summary': metrics_summary
        })
        
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def search(self, request):
        """Advanced search for companies"""
        query = request.query_params.get('q', '')
        industry = request.query_params.get('industry', '')
        stage = request.query_params.get('stage', '')
        min_score = request.query_params.get('min_score', 0)
        max_score = request.query_params.get('max_score', 100)
        
        queryset = self.get_queryset()
        
        if query:
            queryset = queryset.filter(
                Q(name__icontains=query) |
                Q(description__icontains=query) |
                Q(headquarters__icontains=query)
            )
        
        if industry:
            queryset = queryset.filter(industry=industry)
        
        if stage:
            queryset = queryset.filter(stage=stage)
        
        queryset = queryset.filter(
            ai_score__gte=min_score,
            ai_score__lte=max_score
        )
        
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = CompanyListSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        
        serializer = CompanyListSerializer(queryset, many=True)
        return Response(serializer.data)

# Analysis ViewSets for each type
class HighLevelAnalysisViewSet(viewsets.ModelViewSet):
    """ViewSet for managing high-level analyses"""
    queryset = HighLevelAnalysis.objects.all()
    permission_classes = [IsAuthenticated]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'summary']
    ordering_fields = ['created_at', 'updated_at', 'overall_score']
    ordering = ['-created_at']
    
    def get_serializer_class(self):
        if self.action == 'list':
            return HighLevelAnalysisListSerializer
        return HighLevelAnalysisSerializer
    
    def perform_create(self, serializer):
        serializer.save(analyst=self.request.user)

class PerceptionAnalysisViewSet(viewsets.ModelViewSet):
    """ViewSet for managing perception analyses"""
    queryset = PerceptionAnalysis.objects.all()
    permission_classes = [IsAuthenticated]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'summary']
    ordering_fields = ['created_at', 'updated_at', 'overall_score']
    ordering = ['-created_at']
    
    def get_serializer_class(self):
        if self.action == 'list':
            return PerceptionAnalysisListSerializer
        return PerceptionAnalysisSerializer
    
    def perform_create(self, serializer):
        serializer.save(analyst=self.request.user)

class MarketAnalysisViewSet(viewsets.ModelViewSet):
    """ViewSet for managing market analyses"""
    queryset = MarketAnalysis.objects.all()
    permission_classes = [IsAuthenticated]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'summary']
    ordering_fields = ['created_at', 'updated_at', 'overall_score']
    ordering = ['-created_at']
    
    def get_serializer_class(self):
        if self.action == 'list':
            return MarketAnalysisListSerializer
        return MarketAnalysisSerializer
    
    def perform_create(self, serializer):
        serializer.save(analyst=self.request.user)

class KeyIndividualsAnalysisViewSet(viewsets.ModelViewSet):
    """ViewSet for managing key individuals analyses"""
    queryset = KeyIndividualsAnalysis.objects.all()
    permission_classes = [IsAuthenticated]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'summary']
    ordering_fields = ['created_at', 'updated_at', 'overall_score']
    ordering = ['-created_at']
    
    def get_serializer_class(self):
        if self.action == 'list':
            return KeyIndividualsAnalysisListSerializer
        return KeyIndividualsAnalysisSerializer
    
    def perform_create(self, serializer):
        serializer.save(analyst=self.request.user)

class CompetitiveAnalysisViewSet(viewsets.ModelViewSet):
    """ViewSet for managing competitive analyses"""
    queryset = CompetitiveAnalysis.objects.all()
    permission_classes = [IsAuthenticated]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'summary']
    ordering_fields = ['created_at', 'updated_at', 'overall_score']
    ordering = ['-created_at']
    
    def get_serializer_class(self):
        if self.action == 'list':
            return CompetitiveAnalysisListSerializer
        return CompetitiveAnalysisSerializer
    
    def perform_create(self, serializer):
        serializer.save(analyst=self.request.user)

class LeadViewSet(viewsets.ModelViewSet):
    """ViewSet for managing leads"""
    queryset = Lead.objects.all()
    permission_classes = [IsAuthenticated]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    # filterset_fields = ['status', 'priority', 'assigned_to']  # Requires django-filter
    search_fields = ['company__name', 'source', 'notes']
    ordering_fields = ['created_at', 'updated_at', 'ai_match_score']
    ordering = ['-created_at']
    
    def perform_create(self, serializer):
        # Auto-assign to current user if not specified
        if not serializer.validated_data.get('assigned_to'):
            serializer.save(assigned_to=self.request.user)
        else:
            serializer.save()
    
    @action(detail=True, methods=['post'])
    def update_status(self, request, pk=None):
        """Update lead status"""
        lead = self.get_object()
        new_status = request.data.get('status')
        
        if new_status in dict(Lead.STATUS_CHOICES):
            lead.status = new_status
            lead.save()
            
            serializer = LeadSerializer(lead)
            return Response(serializer.data)
        
        return Response(
            {'error': 'Invalid status'}, 
            status=status.HTTP_400_BAD_REQUEST
        )

class InvestmentViewSet(viewsets.ModelViewSet):
    """ViewSet for managing investments"""
    queryset = Investment.objects.all()
    permission_classes = [IsAuthenticated]
    filter_backends = [filters.OrderingFilter]
    # filterset_fields = ['status', 'created_by']  # Requires django-filter
    ordering_fields = ['investment_date', 'amount', 'created_at']
    ordering = ['-investment_date']
    
    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

class DashboardViewSet(viewsets.ViewSet):
    """ViewSet for dashboard data"""
    permission_classes = [IsAuthenticated]
    
    @action(detail=False, methods=['get'])
    def stats(self, request):
        """Get dashboard statistics"""
        # Active prospects
        active_prospects = Lead.objects.filter(
            status__in=['new', 'contacted', 'qualified', 'under_review']
        ).count()
        
        # Investment pipeline
        pipeline_investments = Investment.objects.filter(
            status__in=['proposed', 'approved']
        )
        investment_pipeline = pipeline_investments.aggregate(
            total=Sum('amount')
        )['total'] or 0
        
        # Analysis completed this month
        month_start = datetime.now().replace(day=1)
        analysis_completed = (
            HighLevelAnalysis.objects.filter(created_at__gte=month_start, is_completed=True).count() +
            PerceptionAnalysis.objects.filter(created_at__gte=month_start, is_completed=True).count() +
            MarketAnalysis.objects.filter(created_at__gte=month_start, is_completed=True).count() +
            KeyIndividualsAnalysis.objects.filter(created_at__gte=month_start, is_completed=True).count() +
            CompetitiveAnalysis.objects.filter(created_at__gte=month_start, is_completed=True).count()
        )
        
        # Success rate (investments vs total leads)
        total_leads = Lead.objects.count()
        successful_investments = Investment.objects.filter(
            status__in=['completed', 'exited']
        ).count()
        success_rate = (successful_investments / total_leads * 100) if total_leads > 0 else 0
        
        # New companies this week
        week_ago = datetime.now() - timedelta(days=7)
        new_companies = Company.objects.filter(
            created_at__gte=week_ago
        ).count()
        
        # Average match score
        avg_match_score = Lead.objects.filter(
            ai_match_score__isnull=False
        ).aggregate(avg=Avg('ai_match_score'))['avg'] or 0
        
        # Hot leads (high priority + high score)
        hot_leads = Lead.objects.filter(
            priority__in=['high', 'critical'],
            ai_match_score__gte=80
        ).count()
        
        stats_data = {
            'active_prospects': active_prospects,
            'investment_pipeline': investment_pipeline,
            'analysis_completed': analysis_completed,
            'success_rate': round(success_rate, 1),
            'new_companies_this_week': new_companies,
            'avg_match_score': round(avg_match_score, 1),
            'hot_leads': hot_leads
        }
        
        serializer = DashboardStatsSerializer(stats_data)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def recent_analyses(self, request):
        """Get recent analyses for dashboard"""
        # Get recent analyses from all types
        recent_high_level = HighLevelAnalysis.objects.select_related('company', 'analyst').order_by('-created_at')[:2]
        recent_perception = PerceptionAnalysis.objects.select_related('company', 'analyst').order_by('-created_at')[:2]
        recent_market = MarketAnalysis.objects.select_related('company', 'analyst').order_by('-created_at')[:2]
        recent_key_individuals = KeyIndividualsAnalysis.objects.select_related('company', 'analyst').order_by('-created_at')[:2]
        recent_competitive = CompetitiveAnalysis.objects.select_related('company', 'analyst').order_by('-created_at')[:2]
        
        # Combine and sort by created_at
        all_recent = list(recent_high_level) + list(recent_perception) + list(recent_market) + list(recent_key_individuals) + list(recent_competitive)
        all_recent.sort(key=lambda x: x.created_at, reverse=True)
        
        # Serialize each type appropriately
        serialized_analyses = []
        for analysis in all_recent[:5]:  # Limit to 5 most recent
            if isinstance(analysis, HighLevelAnalysis):
                serializer = HighLevelAnalysisListSerializer(analysis)
            elif isinstance(analysis, PerceptionAnalysis):
                serializer = PerceptionAnalysisListSerializer(analysis)
            elif isinstance(analysis, MarketAnalysis):
                serializer = MarketAnalysisListSerializer(analysis)
            elif isinstance(analysis, KeyIndividualsAnalysis):
                serializer = KeyIndividualsAnalysisListSerializer(analysis)
            elif isinstance(analysis, CompetitiveAnalysis):
                serializer = CompetitiveAnalysisListSerializer(analysis)
            serialized_analyses.append(serializer.data)
        
        return Response(serialized_analyses)
    
    @action(detail=False, methods=['get'])
    def upcoming_tasks(self, request):
        """Get upcoming tasks for dashboard"""
        # This would typically come from a Task model
        # For now, return mock data or derive from leads
        upcoming_leads = Lead.objects.filter(
            status__in=['new', 'contacted'],
            assigned_to=request.user
        ).order_by('created_at')[:5]
        
        tasks = []
        for lead in upcoming_leads:
            tasks.append({
                'id': lead.id,
                'task': f'Follow up with {lead.company.name}',
                'priority': lead.priority.title(),
                'due_date': 'Today' if lead.created_at.date() == datetime.now().date() else 'This week',
                'type': 'follow_up'
            })
        
        return Response(tasks)

class UserProfileViewSet(viewsets.ModelViewSet):
    """ViewSet for user profiles"""
    queryset = UserProfile.objects.all()
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        # Users can only see their own profile
        if self.action == 'list':
            return UserProfile.objects.filter(user=self.request.user)
        return UserProfile.objects.all()
    
    @action(detail=False, methods=['get'])
    def me(self, request):
        """Get current user's profile"""
        try:
            profile = UserProfile.objects.get(user=request.user)
            serializer = UserProfileSerializer(profile)
            return Response(serializer.data)
        except UserProfile.DoesNotExist:
            # Create profile if it doesn't exist
            profile = UserProfile.objects.create(user=request.user)
            serializer = UserProfileSerializer(profile)
            return Response(serializer.data)
