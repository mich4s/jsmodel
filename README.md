# jsmodel
Simple "library" for hxr models

This is simple test class. I've needed small model with api bind and coulnd't find anything that fits my needs.
This is far from perfect, but maybe for some people this will be helpfull.

To be honest, this shouldn't be public(lame code), but I didn't wanted to spend money for private repo.

It's still not finished, but i edit this only when i need more functionalities.

Full code is under WTFPL license.

TODO:
Save, Update, Delete(didn't needed this jet).

Example of usage:

```
var tmp = new jsModel('api/posts/:id', {id: 'id'});
var t1 = tmp.get({id: 1});
var t2 = tmp.query();
```