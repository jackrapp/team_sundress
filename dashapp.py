# Dependencies Here
# ...

# Importing the flask app instance
from app import create_app

# Create Flask server app
server = create_app()

#################################################
# Creating the dash app
#################################################

# Create dash app passing our server
dashapp = dash.Dash(__name__, server=server, url_base_pathname='/dashapp/')
app_dash.scripts.config.serve_locally = False


#  Layout definition
# Can make separate pages to render the layout and callbacks - and call these from a folder?
dashapp.layout = html.Div([
# ...   
])

# Callback
@dashapp.callback(Output('my-graph', 'figure'), [Input('my-dropdown', 'value')])
def update_graph(selected_dropdown_value):
# ...