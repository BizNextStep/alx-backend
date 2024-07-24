#!/usr/bin/env python3
""" LFUCache module
"""

from base_caching import BaseCaching
from collections import OrderedDict

class LFUCache(BaseCaching):
    """ LFUCache defines a LFU caching system """

    def __init__(self):
        """ Initialize """
        super().__init__()
        self.frequency = {}
        self.order = OrderedDict()

    def put(self, key, item):
        """ Add an item in the cache """
        if key is not None and item is not None:
            if key in self.cache_data:
                self.cache_data[key] = item
                self.frequency[key] += 1
                self.order.move_to_end(key)
            else:
                if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
                    lfu_keys = [k for k, v in self.frequency.items() if v == min(self.frequency.values())]
                    if len(lfu_keys) == 1:
                        lfu_key = lfu_keys[0]
                    else:
                        lfu_key = next(iter(self.order))
                        for k in self.order:
                            if k in lfu_keys:
                                lfu_key = k
                                break
                    del self.cache_data[lfu_key]
                    del self.frequency[lfu_key]
                    self.order.pop(lfu_key)
                    print(f"DISCARD: {lfu_key}")
                self.cache_data[key] = item
                self.frequency[key] = 1
                self.order[key] = None

    def get(self, key):
        """ Get an item by key """
        if key is not None and key in self.cache_data:
            self.frequency[key] += 1
            self.order.move_to_end(key)
            return self.cache_data[key]
        return None

