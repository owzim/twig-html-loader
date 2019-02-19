import { getOptions } from 'loader-utils';
import Twig from 'twig';

export default function loader(content, map, meta) {
  const query = getOptions(this) || {};
  const data = query.data || {};
  const path = require.resolve(this.resource);
  const callback = this.async();

  const options = {
    path,
    data: content,
    debug: Boolean(query.debug || false),
    trace: Boolean(query.trace || false),
    allowInlineIncludes: true,
    rethrow: true,
  };

  if (query.cache !== true) {
    Twig.cache(false);
  }

  Twig.twig(options)
    .renderAsync(data)
    .then(
      result => callback(null, result, map, meta),
      error => callback(error)
    );
}
