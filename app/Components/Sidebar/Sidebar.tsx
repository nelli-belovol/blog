'use client';

import Image from 'next/image';
import { useGlobalState } from '../../context/globalProvider';
import React from 'react';
import styled from 'styled-components';

import menu from '@/app/utils/menu';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import Button from '../Button/Button';
import { arrowLeft, bars, logout } from '@/app/utils/Icons';
import { UserButton, useClerk, useUser } from '@clerk/nextjs';
const Sidebar = () => {
  const { user } = useUser();

  const { firstName, lastName, imageUrl } = user || {
    firstName: '',
    lastName: '',
    imageUrl: '',
  };

  const { theme, collapsed, collapseMenu } = useGlobalState();
  const { signOut } = useClerk();
  const router = useRouter();
  const pathname = usePathname();
  const handleClick = (link: string) => {
    router.push(link);
  };

  return (
    <SidebarStyled collapsed={collapsed} theme={theme}>
      <button className="toggle-nav" onClick={collapseMenu}>
        {collapsed ? bars : arrowLeft}
      </button>
      <div className="profile">
        <div className="profile-overlay"></div>
        <div className="image" style={{ width: 70, height: 70 }}>
          <Image width={70} height={70} src={imageUrl} alt="Profile" priority />
        </div>
        <div className="user-btn absolute z-20 top-0 w-full h-full">
          <UserButton />
        </div>
        <h1 className="capitalize">
          {firstName} {lastName}
        </h1>
      </div>
      <ul className="nav-items">
        {menu.map(item => {
          const link = item.link;
          return (
            <li
              key={link}
              className={`nav-item ${pathname === link ? 'active' : ''}`}
              onClick={() => handleClick(link)}
            >
              {item.icon}
              <Link href={link}>{item.title}</Link>
            </li>
          );
        })}
      </ul>
      <div className="sign-out relative m-6">
        <Button
          name="Sign Out"
          click={() => signOut({ redirectUrl: '/sign-in' })}
          type="submit"
          padding="0.4rem 0.8rem"
          borderRad="0.8rem"
          fw="500"
          fs="1.2rem"
          icon={logout}
        />
      </div>
    </SidebarStyled>
  );
};

const SidebarStyled = styled.nav<{ collapsed: boolean }>`
  position: relative;
  background-color: ${props => props.theme.colorBg2};
  width: auto;
  border: 2px solid ${props => props.theme.borderColor2};
  border-radius: 1rem;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: ${props => props.theme.colorGrey3};

  @media screen and (max-width: 768px) {
    position: fixed;
    height: calc(100vh - 2rem);
    z-index: 100;

    transition: all 0.3s cubic-bezier(0.53, 0.21, 0, 1);
    transform: ${props =>
      props.collapsed ? 'translateX(-106%)' : 'translateX(0)'};
  }
  .toggle-nav {
    display: none;
    position: absolute;
    right: -69px;
    top: 1.8rem;
    padding: 0.8rem 0.9rem;
    border-top-right-radius: 1rem;
    border-bottom-right-radius: 1rem;
    background-color: ${props => props.theme.colorBg2};
    border-right: 2px solid ${props => props.theme.borderColor2};
    border-top: 2px solid ${props => props.theme.borderColor2};
    border-bottom: 2px solid ${props => props.theme.borderColor2};

    @media screen and (max-width: 768px) {
      display: block;
    }
  }

  @media screen and (max-width: 768px) {
    position: fixed;
    height: calc(100vh - 2rem);
    z-index: 100;
  }

  .cl-rootBox {
    width: 100%;
    height: 100%;
  }
  .cl-userButtonTrigger {
    width: 100%;
    height: 100%;
    opacity: 0;
  }
  .profile {
    margin: 1.5rem;
    padding: 1rem 0.8rem;
    position: relative;

    border-radius: 1rem;
    cursor: pointer;

    font-weight: 500;
    color: ${props => props.theme.colorGrey0};

    display: flex;
    align-items: center;
    flex-direction: row;

    .profile-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      backdrop-filter: blur(10px);

      z-index: 0;
      background: ${props => props.theme.colorBg3};
      /* transition: all 0.55s linear; */
      border-radius: 1rem;

      opacity: 0.2;
    }

    h1 {
      font-size: 1.2rem;
      display: flex;
      flex-direction: column;

      line-height: 1.4;
    }

    h1,
    .image {
      position: relative;
      z-index: 1;
    }

    .image {
      flex-shrink: 0;
      display: inline-block;
      overflow: hidden;
      transition: all 0.5s ease;
      border-radius: 100%;

      width: 70px;
      height: 70px;

      img {
        border-radius: 100%;
        transition: all 0.5s ease;
      }
    }

    > h1 {
      margin-left: 0.8rem;
      font-size: clamp(1.2rem, 4vw, 1.4rem);
      line-height: 100%;
    }
    &:hover {
      .profile-overlay {
        opacity: 1;
        border: 2px solid ${props => props.theme.borderColor2};
      }

      img {
        transform: scale(1.1);
      }
    }
  }

  .nav-item {
    position: relative;
    padding: 0.8rem 1.5rem 0.8rem 2.1rem;
    margin: 0.3rem 0;
    display: grid;
    align-items: center;
    grid-template-columns: 40px 1fr;
    cursor: pointer;
    line-height: 0;

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 0%;
      height: 100%;
      background-color: ${props => props.theme.activeNavLinkHover};
      z-index: 1;
      transition: all 0.3s ease-in-out;
    }
    &::before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      width: 0%;
      height: 100%;
      background-color: ${props => props.theme.colorGreenDark};

      border-bottom-left-radius: 5px;
      border-top-left-radius: 5px;
    }

    a {
      transition: all 0.3s ease-in-out;
      font-weight: 500;
      z-index: 2;
      line-height: 0.8;
    }
    i {
      display: flex;
      align-items: center;
      color: ${props => props.theme.colorIcons};
    }
    &:hover {
      &::after {
        width: 100%;
      }
    }
  }

  .active {
    background-color: ${props => props.theme.activeNavLink};

    i,
    a {
      color: ${props => props.theme.colorIcons2};
    }
  }

  .active::before {
    width: 0.3rem;
  }

  & > button {
    margin: 1.5rem;
  }
`;

export default Sidebar;
