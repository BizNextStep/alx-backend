#!/usr/bin/env python3
""" BasicCache module
"""
from base_caching import BaseCaching

class BasicCache(BaseCaching):
    """ BasicCache defines a basic caching system without limit """

    def put(self, key, item):
        """ Adds an item in the cache.
        If key or item is None, this method should not do anything.
        """
        if key and item:
            self.cache_data[key] = item

    def get(self, key):
        """ Retrieves an item by key.
        If key is None or if the key doesn’t exist in self.cache_data, return None.
        """
        return self.cache_data.get(key, None)
