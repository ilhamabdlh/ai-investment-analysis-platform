from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken.views import obtain_auth_token
from .views import (
    CompanyViewSet, LeadViewSet, InvestmentViewSet,
    DashboardViewSet, UserProfileViewSet,
    HighLevelAnalysisViewSet, PerceptionAnalysisViewSet, MarketAnalysisViewSet,
    KeyIndividualsAnalysisViewSet, CompetitiveAnalysisViewSet
)

router = DefaultRouter()
router.register(r'companies', CompanyViewSet)
router.register(r'high-level-analyses', HighLevelAnalysisViewSet)
router.register(r'perception-analyses', PerceptionAnalysisViewSet)
router.register(r'market-analyses', MarketAnalysisViewSet)
router.register(r'key-individuals-analyses', KeyIndividualsAnalysisViewSet)
router.register(r'competitive-analyses', CompetitiveAnalysisViewSet)
router.register(r'leads', LeadViewSet)
router.register(r'investments', InvestmentViewSet)
router.register(r'dashboard', DashboardViewSet, basename='dashboard')
router.register(r'profiles', UserProfileViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('auth/token/', obtain_auth_token, name='api_token_auth'),
]
