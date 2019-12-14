from cms.models import Page

def pages(request):
    return {
        'pages': Page.objects.filter(is_published=True)
    }
