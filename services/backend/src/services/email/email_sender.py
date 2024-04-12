import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from src.core.logging import logger
from src.core.settings.settings import get_settings


class EmailSender:
    """Email sender class.

    This class is responsible for sending emails using the SMTP protocol.
    """

    def __init__(
        self,
    ) -> None:
        """Initialize the EmailSender class."""
        self._smtp_server = get_settings().networking.SMTP_SERVER
        self._smtp_port = get_settings().networking.SMTP_PORT
        self._smtp_username = get_settings().email.SMTP_USERNAME
        self._smtp_password = get_settings().email.SMTP_PASSWORD

        logger.success("EmailSender initialized.")

    def close(self) -> None:
        """Close the EmailSender class."""
        self._smtp_server = None
        self._smtp_port = None
        self._smtp_username = None
        self._smtp_password = None

        logger.success("EmailSender closed.")

    async def send_email(self, sender_email, receiver_email, subject, body) -> None:
        message = MIMEMultipart("alternative")
        message["From"] = sender_email
        message["To"] = receiver_email
        message["Subject"] = subject

        if (
            not self._smtp_server
            or not self._smtp_port
            or not self._smtp_username
            or not self._smtp_password
        ):
            raise ValueError("EmailSender not initialized correctly.")

        # Attach HTML body
        html_body = MIMEText(body, "html")
        message.attach(html_body)

        # Create SMTP session
        with smtplib.SMTP(self._smtp_server, self._smtp_port) as server:
            # Secure the connection
            server.starttls()

            # Login
            server.login(self._smtp_username, self._smtp_password)

            # Convert message to string
            text = message.as_string()

            # Send email
            server.sendmail(sender_email, receiver_email, text)


email_sender = EmailSender()
