import { getParamFromProps } from './helper';

describe('helper', () => {
  describe('getParamFromProps()', () => {
    it('Happy path', () => {
      expect(getParamFromProps({ match: { params: { foo: '1' } } }, 'foo')).toEqual(1);
    });

    it('Should return null when key is not given or key does not exist', () => {
      const props = { match: { params: { foo: '1' } } };
      expect(getParamFromProps(props)).toEqual(null);
      expect(getParamFromProps(props, 'bar')).toEqual(null);
    });

    it('Should return null when key is not given or key does not exist', () => {
      const props = { match: { params: { foo: '1' } } };
      expect(getParamFromProps(props)).toEqual(null);
      expect(getParamFromProps(props, 'bar')).toEqual(null);
    });

    it('Should return null when param is not a valid number', () => {
      let props;
      props = { match: { params: { foo: 'a12' } } };
      expect(getParamFromProps(props, 'foo')).toEqual(null);
      props = { match: { params: { foo: '1a2' } } };
      expect(getParamFromProps(props, 'foo')).toEqual(null);
      props = { match: { params: { foo: '12a' } } };
      expect(getParamFromProps(props, 'foo')).toEqual(null);
    });
  });
});
