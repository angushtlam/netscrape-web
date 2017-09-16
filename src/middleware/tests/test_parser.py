import unittest

from utils.parser import parse_html


class TestParser(unittest.TestCase):

    def setUp(self):
        with open("tests/test_parser.html") as file:
            self.html = file.read()

    def test_parse_html_site_title(self):
        selectors = ["html body header div#site-title.test1.test2"]
        expected = ["Site Title <small>(beta)</small>"]
        actual = [x.html() for x in parse_html(self.html, selectors)]
        self.assertCountEqual(expected, actual)

    def test_parse_text_multiple(self):
        selectors = [
            "html body main div.plastic-wrapper",
            "html body footer"
        ]
        expected = [
            "Hello World!",
            "Left foot Right foot"
        ]
        actual = [x.text() for x in parse_html(self.html, selectors)]
        self.assertCountEqual(expected, actual)
