const AddressInputs = ({ addressProps, setAddressProps, disabled = false }) => {
  const { phone, streetAddress, postalCode, country, city } = addressProps;
  return (
    <>
      <label className="text-primary font-semibold border-b border-primary block">
        Phone number
      </label>
      <input
        disabled={disabled}
        type="tel"
        placeholder="Phone number"
        value={phone || ''}
        onChange={(ev) => setAddressProps('phone', ev.target.value)}
      />
      <label className="text-primary font-semibold border-b border-primary block">
        Street address
      </label>
      <input
        disabled={disabled}
        type="text"
        placeholder="Street address"
        value={streetAddress || ''}
        onChange={(ev) => setAddressProps('streetAddress', ev.target.value)}
      />

      <div className="flex gap-2">
        <div>
          <label className="text-primary font-semibold border-b border-primary block mb-2">
            Postal code
          </label>
          <input
            disabled={disabled}
            style={{ margin: '0px' }}
            type="text"
            placeholder="Postal code"
            value={postalCode || ''}
            onChange={(ev) => setAddressProps('postalCode', ev.target.value)}
          />
        </div>
        <div>
          <label className="text-primary font-semibold border-b border-primary block mb-2">
            City
          </label>
          <input
            disabled={disabled}
            style={{ margin: '0px' }}
            type="text"
            placeholder="City"
            value={city || ''}
            onChange={(ev) => setAddressProps('city', ev.target.value)}
          />
        </div>
      </div>
      <label className="text-primary font-semibold border-b border-primary block">
        Country
      </label>
      <input
        disabled={disabled}
        type="text"
        placeholder="Country"
        value={country || ''}
        onChange={(ev) => setAddressProps('country', ev.target.value)}
      />
    </>
  );
};
export default AddressInputs;
