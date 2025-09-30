from marshmallow import Schema, fields, validate, validates, ValidationError

class UserProfileSchema(Schema):
    """Schema for UserProfile serialization/deserialization"""
    
    class Meta:
        strict = True
    
    id = fields.Str(dump_only=True)
    user_id = fields.Str(required=True)
    role = fields.Str(validate=validate.OneOf(['ADMIN', 'PROJECT_OWNER', 'USER', 'VERIFIER']))
    wallet_address = fields.Str(validate=validate.Length(equal=42))
    organization = fields.Str(validate=validate.Length(max=200))
    country = fields.Str(validate=validate.Length(max=100))
    phone_number = fields.Str(validate=validate.Length(max=20))
    bio = fields.Str()
    total_credits_earned = fields.Float(dump_only=True)
    total_credits_sold = fields.Float(dump_only=True)
    total_credits_bought = fields.Float(dump_only=True)
    created_at = fields.DateTime(dump_only=True)
    updated_at = fields.DateTime(dump_only=True)
    
    @validates('wallet_address')
    def validate_wallet_address(self, value):
        """Validate Ethereum wallet address"""
        if value and not (value.startswith('0x') and len(value) == 42):
            raise ValidationError('Wallet address must be a valid Ethereum address (0x...)')

class UserProfileCreateSchema(Schema):
    """Schema for profile creation"""
    user_id = fields.Str(required=True)
    role = fields.Str(validate=validate.OneOf(['ADMIN', 'PROJECT_OWNER', 'USER', 'VERIFIER']))
    wallet_address = fields.Str(validate=validate.Length(equal=42))
    organization = fields.Str(validate=validate.Length(max=200))
    country = fields.Str(validate=validate.Length(max=100))
    phone_number = fields.Str(validate=validate.Length(max=20))
    bio = fields.Str()
    
class UserProfileUpdateSchema(Schema):
    """Schema for profile updates"""
    role = fields.Str(validate=validate.OneOf(['ADMIN', 'PROJECT_OWNER', 'USER', 'VERIFIER']))
    wallet_address = fields.Str(validate=validate.Length(equal=42))
    organization = fields.Str(validate=validate.Length(max=200))
    country = fields.Str(validate=validate.Length(max=100))
    phone_number = fields.Str(validate=validate.Length(max=20))
    bio = fields.Str()
    total_credits_earned = fields.Float(dump_only=True)
    total_credits_sold = fields.Float(dump_only=True)
    total_credits_bought = fields.Float(dump_only=True)
