import sys
from loguru import logger

LOGGING_FORMAT: str = (
    "<green>{time:YYYY-MM-DD HH:mm:ss}</green> | "
    "<level>{level}</level> | "
    "<cyan>{name}</cyan>:<cyan>{function}</cyan>:<cyan>{line}</cyan> - "
    "<level>{message}</level>"
)


def setup_logging() -> None:
    """
    Set up logging configuration.
    """
    # Remove any existing handlers.
    logger.remove()

    # Add standard out handler with colored output.
    logger.add(
        sink=sys.stderr,
        colorize=True,
        format=LOGGING_FORMAT,
        level="DEBUG",
    )
    # Add file handler
    logger.add(
        sink="logs/app.log",
        rotation="100 MB",  # Rotate log files after reaching 100 MB
        retention="7 days",  # Keep logs for 7 days
        encoding="utf-8",
        level="DEBUG",
        format=LOGGING_FORMAT,
    )
