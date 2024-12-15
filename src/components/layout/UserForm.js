'use client';
import { useState } from 'react';
import EditableImage from '../../components/layout/EditableImage';
import { useProfile } from '../UseProfile';
import AddressInputs from './AddressInputs';

const UserForm = ({ user, onSave }) => {
  const [userName, setUserName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [streetAddress, setStreetAddress] = useState(user?.streetAddress || '');
  const [postalCode, setPostalCode] = useState(user?.postalCode || '');
  const [city, setCity] = useState(user?.city || '');
  const [country, setCountry] = useState(user?.country || '');
  const [image, setImage] = useState(user?.image || '');
  const [admin, setAdmin] = useState(user?.admin || false);
  const { data } = useProfile();

  function handleAddressChange(propName, value) {
    if (propName === 'city') setCity(value);
    if (propName === 'phone') setPhone(value);
    if (propName === 'streetAddress') setStreetAddress(value);
    if (propName === 'postalCode') setPostalCode(value);
    if (propName === 'country') setCountry(value);
  }

  return (
    <div className="md:flex gap-4">
      <div>
        <div className="p-2 rounded-lg relative max-w-[120px]">
          <EditableImage link={image} setLink={setImage} />
        </div>
      </div>

      <form
        className="grow"
        onSubmit={(ev) =>
          onSave(ev, {
            name: userName,
            image,
            phone,
            streetAddress,
            city,
            country,
            postalCode,
            admin,
          })
        }
      >
        <label className="text-primary font-semibold border-b border-primary block">
          Full name
        </label>
        <input
          type="text"
          placeholder={'First and last names'}
          value={userName}
          onChange={(ev) => setUserName(ev.target.value)}
        />
        <label className="text-primary font-semibold border-b border-primary block">
          Email
        </label>
        <input
          type="text"
          placeholder={'Email'}
          value={user.email}
          disabled={true}
        />
        <AddressInputs
          addressProps={{ streetAddress, postalCode, city, country, phone }}
          setAddressProps={handleAddressChange}
        />
        {data.admin && (
          <div>
            <label
              className="p-2 inline-flex items-center gap-2  border rounded-lg mb-2"
              htmlFor="adminCb"
            >
              {' '}
              <input
                id="adminCb"
                type="checkbox"
                value={'1'}
                checked={admin}
                onChange={(ev) => setAdmin(ev.target.checked)}
              />
              <span>Admin</span>
            </label>
          </div>
        )}

        <button type="submit">Save</button>
      </form>
    </div>
  );
};
export default UserForm;
