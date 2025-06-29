from rest_framework import serializers

class OCRSerializer(serializers.Serializer):
    filename = serializers.CharField()
    structured_data = serializers.ListField(child=serializers.DictField())
    processing_time = serializers.FloatField()