from typing import Iterator, List

import lxml
from pyquery import PyQuery
import requests

from utils.resolver import resolve_url_pattern


def parse_pages(url_pattern: str, selectors: List[str]) -> Iterator[List[List[str]]]:
    for url in resolve_url_pattern(url_pattern):
        page = requests.get(url)
        yield list(parse_html(page.content, selectors))


def parse_html(html: str, selectors: List[str]) -> Iterator[List[str]]:
    pq = PyQuery(html)
    for selector in selectors:
        yield [lxml.html.tostring(element, encoding=str) for element in pq(selector)]
