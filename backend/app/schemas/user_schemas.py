from marshmallow import Schema, fields, validate, validates, ValidationError
import re

class UserSchema(Schema):
    """Schema for User serialization/deserialization"""
    
    class Meta:
        strict = True
    
    id = fields.Str(dump_only=True)
    name = fields.Str(validate=validate.Length(max=100))
    email = fields.Email(required=True, validate=validate.Length(max=120))
    email_verified = fields.Bool(dump_only=True)
    image = fields.Str()
    created_at = fields.DateTime(dump_only=True)
    updated_at = fields.DateTime(dump_only=True)
    
    # Nested profile
    profile = fields.Nested('UserProfileSchema', exclude=('user_id',), dump_only=True)
    
    @validates('email')
    def validate_email_format(self, email):
        """Custom email validation"""
        if not re.match(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$', email):
            raise ValidationError('Invalid email format')

class UserCreateSchema(Schema):
    """Schema for user creation"""
    name = fields.Str(validate=validate.Length(max=100))
    email = fields.Email(required=True, validate=validate.Length(max=120))
    image = fields.Str()

class UserUpdateSchema(Schema):
    """Schema for user updates"""
    name = fields.Str(validate=validate.Length(max=100))
    email = fields.Email(validate=validate.Length(max=120))
    image = fields.Str()