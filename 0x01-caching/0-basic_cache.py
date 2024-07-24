#!/usr/bin/env python3
""" 0-main """
BasicCache = __import__('0-basic_cache').BasicCache

my_cache = BasicCache()
my_cache.print_cache()
my_cache.put("A", "Hello")
my_cache.put("B", "World")
my_cache.put("C", "Holberton")
my_cache.print_cache()
print(my_cache.get("A"))  # Should print: Hello
print(my_cache.get("B"))  # Should print: World
print(my_cache.get("C"))  # Should print: Holberton
print(my_cache.get("D"))  # Should print: None
my_cache.print_cache()
my_cache.put("D", "School")
my_cache.put("E", "Battery")
my_cache.put("A", "Street")
my_cache.print_cache()
print(my_cache.get("A"))  # Should print: Street

