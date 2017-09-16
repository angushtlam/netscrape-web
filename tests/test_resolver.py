import unittest

from utils.resolver import resolve_url_pattern


class TestResolver(unittest.TestCase):

    def test_resolve_empty(self):
        expected = []
        actual = list(resolve_url_pattern(""))
        self.assertCountEqual(expected, actual)

    def test_resolve_no_http(self):
        expected = []
        actual = list(resolve_url_pattern("example.com"))
        self.assertCountEqual(expected, actual)

    def test_resolve_no_pattern(self):
        expected = ["http://example.com/hello"]
        actual = list(resolve_url_pattern("http://example.com/hello"))
        self.assertCountEqual(expected, actual)

    def test_resolve_pattern_no_args(self):
        expected = []
        actual = list(resolve_url_pattern("https://example.com/{}"))
        self.assertCountEqual(expected, actual)

    def test_resolve_pattern_one_arg(self):
        expected = [
            "https://example.com/items?item=0",
            "https://example.com/items?item=1",
            "https://example.com/items?item=2",
            "https://example.com/items?item=3",
        ]
        actual = list(resolve_url_pattern("https://example.com/items?item={4}"))
        self.assertCountEqual(expected, actual)

    def test_resolve_pattern_two_args(self):
        expected = [
            "https://example.com/search?page=2",
            "https://example.com/search?page=3",
        ]
        actual = list(resolve_url_pattern("https://example.com/search?page={2, 4}"))
        self.assertCountEqual(expected, actual)

    def test_resolve_pattern_three_args(self):
        expected = [
            "https://example.com/search?offset=20",
            "https://example.com/search?offset=40",
            "https://example.com/search?offset=60",
        ]
        actual = list(resolve_url_pattern("https://example.com/search?offset={20, 80, 20}"))
        self.assertCountEqual(expected, actual)

    def test_resolve_multiple_patterns(self):
        expected = []
        actual = list(resolve_url_pattern("https://example.com/?a={3}&b={7}"))
        self.assertCountEqual(expected, actual)
