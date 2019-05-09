from flask import Flask

#################################################
# Flask with Dash Database Setup
#################################################

def create_app():
    server = Flask(__name__)

    # Register routes blueprint to Flask server
    from app.routes import server_bp
    server.register_blueprint(server_bp)

    # from app.dashapp.layout import layout
    # from app.dashapp.callbacks import register_callbacks
    # register_dashapp(server, 'Dashapp', 'dashboard', layout, register_callbacks)

    return server


#################################################
# Dash Database Variables
#################################################

# def register_dashapp(app, title, base_pathname, layout, register_callbacks_fun):
#     # Meta tags for viewport responsiveness
#     meta_viewport = {"name": "viewport", "content": "width=device-width, initial-scale=1, shrink-to-fit=no"}

#     my_dashapp = dash.Dash(__name__,
#                            server=app,
#                            url_base_pathname=f'/dashboard/',
#                            assets_folder=get_root_path(__name__) + f'/{base_pathname}/assets/',
#                            meta_tags=[meta_viewport])

#     my_dashapp.title = title
#     my_dashapp.layout = layout
#     register_callbacks_fun(my_dashapp)
#     _protect_dashviews(my_dashapp)
