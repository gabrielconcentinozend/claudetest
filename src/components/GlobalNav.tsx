import { useState } from 'react';
import { Header, Nav, Main, Product, ProfileMenu } from '@zendesk-ui/navigation';

// Product icons
import ProductSupportIcon from '@zendesk-ui/assets/icons/20px/product-support.svg?react';
import ProductKnowledgeIcon from '@zendesk-ui/assets/icons/20px/product-knowledge.svg?react';
import ProductCommunityIcon from '@zendesk-ui/assets/icons/20px/product-community.svg?react';
import ProductChatIcon from '@zendesk-ui/assets/icons/20px/product-chat.svg?react';
import ProductVoiceIcon from '@zendesk-ui/assets/icons/20px/product-voice.svg?react';
import ProductAnalyticsIcon from '@zendesk-ui/assets/icons/20px/product-analytics.svg?react';
import ProductSalesIcon from '@zendesk-ui/assets/icons/20px/product-sales.svg?react';
import ProductWfmIcon from '@zendesk-ui/assets/icons/20px/product-workforce-management.svg?react';
import ProductQaIcon from '@zendesk-ui/assets/icons/20px/product-quality-assurance.svg?react';
import ProductAiAgentsIcon from '@zendesk-ui/assets/icons/20px/product-ai-agents.svg?react';
import ProductAdminCenterIcon from '@zendesk-ui/assets/icons/20px/product-admin-center.svg?react';

// Header icons
import MagnifyingGlassIcon from '@zendesk-ui/assets/icons/20px/magnifying-glass-fill.svg?react';
import RescueRingIcon from '@zendesk-ui/assets/icons/20px/rescue-ring-fill.svg?react';

// Nav icons
import HomeIcon from '@zendesk-ui/assets/icons/20px/home-fill.svg?react';
import PeopleIcon from '@zendesk-ui/assets/icons/20px/people-fill.svg?react';
import BubblesIcon from '@zendesk-ui/assets/icons/20px/bubbles-fill.svg?react';
import SquareGridCircleIcon from '@zendesk-ui/assets/icons/20px/square-grid-circle-fill.svg?react';
import GearIcon from '@zendesk-ui/assets/icons/20px/gear-fill.svg?react';

const products = [
  { value: 'support', label: 'Support', href: '#', icon: <ProductSupportIcon /> },
  { value: 'knowledge', label: 'Knowledge', href: '#', icon: <ProductKnowledgeIcon /> },
  { value: 'community', label: 'Community', href: '#', icon: <ProductCommunityIcon /> },
  { value: 'chat', label: 'Chat', href: '#', icon: <ProductChatIcon /> },
  { value: 'voice', label: 'Voice', href: '#', icon: <ProductVoiceIcon /> },
  { value: 'analytics', label: 'Analytics', href: '#', icon: <ProductAnalyticsIcon /> },
  { value: 'sales', label: 'Sales', href: '#', icon: <ProductSalesIcon /> },
  { value: 'wfm', label: 'Workforce management', href: '#', icon: <ProductWfmIcon /> },
  { value: 'qa', label: 'Quality assurance', href: '#', icon: <ProductQaIcon /> },
  { value: 'ai-agents', label: 'AI agents', href: '#', icon: <ProductAiAgentsIcon /> },
  { value: 'admin-center', label: 'Admin center', href: '#', icon: <ProductAdminCenterIcon />, isSelected: true },
];

interface GlobalNavProps {
  children: React.ReactNode;
}

function GlobalNav({ children }: GlobalNavProps) {
  const [currentNav, setCurrentNav] = useState('account');
  const [userStatus, setUserStatus] = useState<'available' | 'away' | 'transfers' | 'offline'>('available');

  return (
    <Product locale="en-US" products={products}>
      <Header
        startChildren={
          <>
            <Header.Separator />
            <Header.Menu button="Zendesk">
              <Header.MenuItemGroup aria-label="Environment" type="radio">
                <Header.MenuItem value="zendesk">Zendesk</Header.MenuItem>
                <Header.MenuItem value="brand-a">Brand A</Header.MenuItem>
                <Header.MenuItem value="brand-b">Brand B</Header.MenuItem>
              </Header.MenuItemGroup>
            </Header.Menu>
          </>
        }
      >
        <Header.IconButton tooltip="Search">
          <MagnifyingGlassIcon />
        </Header.IconButton>
        <Header.Separator />
        <Header.IconButton tooltip="Help">
          <RescueRingIcon />
        </Header.IconButton>
        <ProfileMenu
          name="Admin User"
          meta="admin@zendesk.com"
          status={userStatus}
          onChange={(value: any) => setUserStatus(value.value)}
        >
          <ProfileMenu.ItemGroup aria-label="Status" type="radio">
            <ProfileMenu.Item status="available" value="available">
              Available
            </ProfileMenu.Item>
            <ProfileMenu.Item status="away" value="away">
              Away
            </ProfileMenu.Item>
          </ProfileMenu.ItemGroup>
          <ProfileMenu.ItemGroup aria-label="Theme">
            <ProfileMenu.Item colorScheme="light" value="light">
              Light theme
            </ProfileMenu.Item>
            <ProfileMenu.Item colorScheme="dark" value="dark">
              Dark theme
            </ProfileMenu.Item>
            <ProfileMenu.Item colorScheme="system" value="system">
              System theme
            </ProfileMenu.Item>
          </ProfileMenu.ItemGroup>
          <ProfileMenu.ItemGroup aria-label="Actions">
            <ProfileMenu.Item value="profile">View profile</ProfileMenu.Item>
            <ProfileMenu.Item value="signout">Sign out</ProfileMenu.Item>
          </ProfileMenu.ItemGroup>
        </ProfileMenu>
      </Header>

      <Nav>
        <Nav.Item
          icon={<HomeIcon />}
          isCurrent={currentNav === 'account'}
          onAction={() => setCurrentNav('account')}
        >
          Account
        </Nav.Item>
        <Nav.Item
          icon={<PeopleIcon />}
          isCurrent={currentNav === 'people'}
          onAction={() => setCurrentNav('people')}
        >
          People
        </Nav.Item>
        <Nav.Item
          icon={<BubblesIcon />}
          isCurrent={currentNav === 'channels'}
          onAction={() => setCurrentNav('channels')}
        >
          Channels
        </Nav.Item>
        <Nav.Item
          icon={<SquareGridCircleIcon />}
          isCurrent={currentNav === 'apps'}
          onAction={() => setCurrentNav('apps')}
        >
          Apps
        </Nav.Item>
        <Nav.Item
          icon={<GearIcon />}
          isCurrent={currentNav === 'settings'}
          onAction={() => setCurrentNav('settings')}
        >
          Settings
        </Nav.Item>
      </Nav>

      <Main>{children}</Main>
    </Product>
  );
}

export default GlobalNav;
