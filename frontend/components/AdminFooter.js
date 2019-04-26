import React, { Component } from 'react';
import User from './User';
import { Admin, ADMIN_VIEW_MUTATION } from './Admin';
import Link from 'next/link';
import styled from 'styled-components';

const AdminFooterStyle = styled.div`
  z-index: 4;
  padding-left: 25px;
  text-shadow: 2px 2px rgba(38, 29, 26, 0.5), 4px 4px 8px rgba(0, 9, 114);
  position: fixed;
  bottom: 0;
  height: 8vh;
  width: 100vw;
  background: ${props => props.theme.honeyButton};
  opacity: 0.8;
  color: white;
  display: grid;
  grid-auto-flow: column;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fill, 150px);
  a {
    color: white;
  }
`;

const MarginBottom = styled.div`
  margin-top: 8vh;
`;
const AdminFooter = () => (
  <User>
    {({ data: { me } }) => (
      <>
        {!me && <span />}
        {me &&
          (me.permissions.includes('ADMIN') ? (
            <>
              <MarginBottom />
              <AdminFooterStyle>
                <Link href="/admin">
                  <a>Admin Panel</a>
                </Link>
                <Admin me={me} />
              </AdminFooterStyle>
            </>
          ) : (
            ''
          ))}
      </>
    )}
  </User>
);

export default AdminFooter;
