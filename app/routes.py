#################################################
# Defining html routes
#################################################

from flask import render_template, Blueprint

server_bp = Blueprint('main', __name__)

@server_bp.route('/')
def index():
    return render_template('index.html')

@server_bp.route('/summary')
def summary():
    return render_template('summary.html')

@server_bp.route('/dashboard')
def render_dashboard():
    return flask.redirect('/dashapp')

@server_bp.route('/navbar')
def navbar():
    return render_template('navbar.html')

@server_bp.route('/footer')
def footer():
    return render_template('footer.html')