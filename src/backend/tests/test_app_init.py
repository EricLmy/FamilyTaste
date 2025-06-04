from app import create_app
 
def test_app_init():
    app = create_app('testing')
    assert app is not None
    assert app.config['TESTING'] is True 