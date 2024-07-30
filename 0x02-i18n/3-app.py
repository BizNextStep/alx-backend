#!/usr/bin/env python3
"""
This module sets up a basic Flask app with Babel for i18n support, locale selection, and template parameterization.
"""

from flask import Flask, render_template, request
from flask_babel import Babel, _

class Config:
    """
    Config class for Flask app.
    """
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = "en"
    BABEL_DEFAULT_TIMEZONE = "UTC"

app = Flask(__name__)
app.config.from_object(Config)

babel = Babel(app)

@babel.localeselector
def get_locale():
    """
    Determine the best match with our supported languages.
    """
    return request.accept_languages.best_match(app.config['LANGUAGES'])

@app.route('/')
def index():
    """
    The index route returns the rendered index.html template.
    """
    return render_template('3-index.html')

if __name__ == "__main__":
    app.run(debug=True)

