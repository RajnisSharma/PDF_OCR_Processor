import time
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .utils import extract_pdf_content, structure_text_to_json
from .serializers import OCRSerializer

class OCRProcessView(APIView):
    def post(self, request):
        start_time = time.time()
        files = request.FILES.getlist('files')
        results = []
        
        for file in files:
            pdf_bytes = file.read()
            
            # Extract content
            raw_data = extract_pdf_content(pdf_bytes)
            
            # Structure data
            structured_data = structure_text_to_json(raw_data)
            
            results.append({
                "filename": file.name,
                "structured_data": structured_data,
                "processing_time": time.time() - start_time
            })
        
        serializer = OCRSerializer(results, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)