from cms.models import Page

def pages(request):
    return {
        'pages': Page.objects.published
    }
