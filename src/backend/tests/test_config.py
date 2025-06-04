import pytest
from config import config
 
def test_config_load():
    dev = config['development']
    prod = config['production']
    assert dev.DEBUG is True
    assert prod.DEBUG is False 