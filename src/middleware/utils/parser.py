from typing import Iterator, List

from bs4 import BeautifulSoup
import requests

from utils.resolver import resolve_url_pattern


def parse_pages(url_pattern: str, selectors: List[str]) -> Iterator[List[List[str]]]:
    for url in resolve_url_pattern(url_pattern):
        page = requests.get(url)
        yield list(parse_html(page.content, selectors))


def parse_html(html: str, selectors: List[str]) -> Iterator[List[str]]:
    soup = BeautifulSoup(html, "html5lib")
    for selector in selectors:
        yield [" ".join(element.text.split()) for element in soup.select(selector)]
