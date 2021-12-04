import itertools

chars = "hina "
prefixList = list(map(''.join, itertools.product(*zip(chars.upper(), chars.lower()))))