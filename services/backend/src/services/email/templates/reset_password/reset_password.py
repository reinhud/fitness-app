from pathlib import Path

from src.core.logging import logger
from src.core.settings.settings import get_settings
from src.models import UserInDB
from src.services.email.email_sender import email_sender


async def send_password_reset_email(user: UserInDB, token: str) -> None:
    """Send a password reset email to the user."""
    # Add token to the reset link
    link = (
        f"{get_settings().environment.PROTOCOL}://localhost:"
        f"{get_settings().networking.BACKEND_HOST_PORT}/auth/validate-reset-password?token={token}"
    )

    sender_email = get_settings().email.SMTP_USERNAME

    subject = "Password Reset Request"

    # Get the path to the HTML email template file
    template_path = (
        Path(__file__).resolve().parent / "password_reset_email_template.html"
    )

    # Load HTML email template from file or database
    with open(template_path, "r") as file:
        html_template = file.read()

    # Customize the HTML email body with user-specific information
    body = html_template.replace("{USER}", str(user.username)).replace(
        "{RESET_LINK}", link
    )

    # Send the email using the provided EmailSender instance
    await email_sender.send_email(sender_email, user.email, subject, body)

    logger.success("Password reset email sent successfully!")
