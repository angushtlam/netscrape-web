from typing import Iterator, List

from pyquery import PyQuery
import requests

from utils.resolver import resolve_url_pattern


def parse_pages(url_pattern: str, selectors: List[str]) -> Iterator[List[str]]:
    for url in resolve_url_pattern(url_pattern):
        page = requests.get(url)
        yield [selection.html() for selection in parse_html(page.content, selectors)]


def parse_html(html: str, selectors: List[str]) -> Iterator[str]:
    pq = PyQuery(html)
    for selector in selectors:
        yield pq(selector)
