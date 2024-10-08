#!/usr/bin/env python3
""" Most Recently Used caching module.
"""
from collections import OrderedDict
from base_caching import BaseCaching

class MRUCache(BaseCaching):
    """Represents an object that allows storing and
    retrieving items from a dictionary with an MRU
    algorithm when the limit is reached.
    """
    def __init__(self):
        """Initializes the cache.
        """
        super().__init__()
        self.cache_data = OrderedDict()

    def put(self, key, item):
        """Adds an item in the cache.
        If the number of items in self.cache_data is higher than BaseCaching.MAX_ITEMS,
        discard the most recently used item (MRU algorithm).
        If key or item is None, this method should not do anything.
        """
        if key is None or item is None:
            return
        if key not in self.cache_data:
            if len(self.cache_data) + 1 > BaseCaching.MAX_ITEMS:
                mru_key, _ = self.cache_data.popitem(False)
                print("DISCARD:", mru_key)
        self.cache_data[key] = item
        self.cache_data.move_to_end(key, last=False)

    def get(self, key):
        """Retrieves an item by key.
        If key is None or if the key doesn’t exist in self.cache_data, return None.
        """
        if key is not None and key in self.cache_data:
            self.cache_data.move_to_end(key, last=False)
        return self.cache_data.get(key, None)
