from pathlib import Path

from src.core.logging import logger
from src.core.settings.settings import get_settings
from src.services.email.email_sender import email_sender
from src.models import TempAccountInDB


async def send_registration_email(account: TempAccountInDB, token: str) -> None:
    """Send a registration email to the account."""
    # Add token to the reset link
    link = (
        f"{get_settings().environment.PROTOCOL}://localhost:"
        f"{get_settings().networking.BACKEND_HOST_PORT}/auth/validate-registration?token={token}"
    )
    sender_email = get_settings().email.SMTP_USERNAME

    subject = "Welcome to our service!"

    # Get the path to the HTML email template file
    template_path = Path(__file__).resolve().parent / "registration_email_template.html"

    # Load HTML email template from file or database
    with open(template_path, "r") as file:
        html_template = file.read()

    # Customize the HTML email body with account-specific information
    body = html_template.replace("{USER}", str(account.username)).replace(
        "{REGISTRATION_LINK}", link
    )

    # Send the email using the provided EmailSender instance
    await email_sender.send_email(sender_email, account.email, subject, body)

    logger.success("Registration email sent successfully!")
