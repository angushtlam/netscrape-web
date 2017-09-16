from typing import Iterator, List

from pyquery import PyQuery
import requests


def parse_pages(urls: List[str], selectors: List[str]) -> Iterator[Iterator[str]]:
    for url in urls:
        yield parse_page(url, selectors)


def parse_page(url: str, selectors: List[str]) -> Iterator[str]:
    page = requests.get(url)
    for selection in parse_html(page.content, selectors):
        yield selection


def parse_html(html: str, selectors: List[str]) -> Iterator[str]:
    pq = PyQuery(html)
    for selector in selectors:
        yield pq(selector)
