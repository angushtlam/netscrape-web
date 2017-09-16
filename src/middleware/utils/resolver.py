import re
from typing import Iterator


URL_PATTERN = re.compile(r"(.*?)\{(.*)\}(.*?)")


def resolve_url_pattern(url: str) -> Iterator[str]:
    if url.startswith("https://") or url.startswith("http://"):
        parts = URL_PATTERN.match(url)

        if parts is not None:
            groups = parts.groups()
            for replacement in _resolve_replacements(groups[1]):
                yield groups[0] + replacement + groups[2]
        elif "{" not in url and "}" not in url:
            yield url

    return
    yield


def _resolve_replacements(group: str) -> Iterator[str]:
    try:
        args = [int(value) for value in group.split(",")]
        for value in range(*args):
            yield str(value)
    except ValueError:
        return
        yield
