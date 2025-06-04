from flask import Flask
from config import config
 
def create_app(config_name):
    app = Flask(__name__)
    app.config.from_object(config[config_name])
    # 后续可注册蓝图、扩展等
    return app 