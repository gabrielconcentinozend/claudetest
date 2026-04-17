import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button } from '@zendeskgarden/react-buttons';
import { getColor } from '@zendeskgarden/react-theming';
import UserIcon from '@zendeskgarden/svg-icons/src/16/user-circle-stroke.svg?react';
import TicketIcon from '@zendeskgarden/svg-icons/src/16/clipboard-list-stroke.svg?react';
import ChatIcon from '@zendeskgarden/svg-icons/src/16/wechat-stroke.svg?react';
import TrendUpIcon from '@zendeskgarden/svg-icons/src/16/line-graph-stroke.svg?react';
import CheckCircleIcon from '@zendeskgarden/svg-icons/src/16/check-circle-stroke.svg?react';
import SettingsIcon from '@zendeskgarden/svg-icons/src/16/gear-stroke.svg?react';
import PeopleIcon from '@zendeskgarden/svg-icons/src/16/user-group-stroke.svg?react';
import AppsIcon from '@zendeskgarden/svg-icons/src/16/grid-2x2-stroke.svg?react';
import MigrationBanner from './MigrationBanner';
import MigrationWizard from './MigrationWizard';

const Container = styled.div`
  padding: 40px;
  max-width: 1440px;
  margin: 0 auto;
`;

const PageHeader = styled.div`
  margin-bottom: 32px;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 600;
  line-height: 36px;
  color: ${(p) => getColor({ theme: p.theme, variable: 'foreground.default' })};
  margin: 0 0 8px 0;
`;

const Subtitle = styled.p`
  font-size: 14px;
  line-height: 20px;
  color: ${(p) => getColor({ theme: p.theme, variable: 'foreground.subtle' })};
  margin: 0;
`;

const Section = styled.section`
  margin-bottom: 40px;
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  line-height: 24px;
  color: ${(p) => getColor({ theme: p.theme, variable: 'foreground.default' })};
  margin: 0 0 16px 0;
`;

const Grid = styled.div<{ columns?: number }>`
  display: grid;
  grid-template-columns: repeat(${(p) => p.columns || 4}, 1fr);
  gap: 16px;
`;

const Card = styled.div`
  background: ${(p) => getColor({ theme: p.theme, variable: 'background.default' })};
  border: 1px solid ${(p) => getColor({ theme: p.theme, variable: 'border.default' })};
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
`;

const MetricCard = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const MetricHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const IconWrapper = styled.div<{ color?: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 4px;
  background: ${(p) =>
    p.color === 'blue'
      ? getColor({ theme: p.theme, hue: 'blue', shade: 100 })
      : p.color === 'green'
        ? getColor({ theme: p.theme, hue: 'green', shade: 100 })
        : p.color === 'purple'
          ? getColor({ theme: p.theme, hue: 'purple', shade: 100 })
          : getColor({ theme: p.theme, hue: 'grey', shade: 200 })};
  color: ${(p) =>
    p.color === 'blue'
      ? getColor({ theme: p.theme, hue: 'blue', shade: 700 })
      : p.color === 'green'
        ? getColor({ theme: p.theme, hue: 'green', shade: 700 })
        : p.color === 'purple'
          ? getColor({ theme: p.theme, hue: 'purple', shade: 700 })
          : getColor({ theme: p.theme, hue: 'grey', shade: 700 })};

  svg {
    width: 16px;
    height: 16px;
  }
`;

const MetricLabel = styled.div`
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
  color: ${(p) => getColor({ theme: p.theme, variable: 'foreground.default' })};
`;

const MetricValue = styled.div`
  font-size: 32px;
  font-weight: 600;
  line-height: 40px;
  color: ${(p) => getColor({ theme: p.theme, variable: 'foreground.default' })};
`;

const MetricChange = styled.div<{ $$isPositive?: boolean }>`
  font-size: 12px;
  line-height: 16px;
  color: ${(p) =>
    p.$$isPositive
      ? getColor({ theme: p.theme, hue: 'green', shade: 700 })
      : getColor({ theme: p.theme, hue: 'red', shade: 700 })};
`;

const QuickActionCard = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${(p) => getColor({ theme: p.theme, hue: 'blue', shade: 600 })};
  }
`;

const ActionTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  color: ${(p) => getColor({ theme: p.theme, variable: 'foreground.default' })};
`;

const ActionDescription = styled.div`
  font-size: 14px;
  line-height: 20px;
  color: ${(p) => getColor({ theme: p.theme, variable: 'foreground.subtle' })};
`;

const ActivityList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ActivityItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: ${(p) => getColor({ theme: p.theme, variable: 'background.default' })};
  border: 1px solid ${(p) => getColor({ theme: p.theme, variable: 'border.default' })};
  border-radius: 8px;
`;

const ActivityIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${(p) => getColor({ theme: p.theme, hue: 'grey', shade: 200 })};
  color: ${(p) => getColor({ theme: p.theme, hue: 'grey', shade: 700 })};
  flex-shrink: 0;

  svg {
    width: 16px;
    height: 16px;
  }
`;

const ActivityContent = styled.div`
  flex: 1;
`;

const ActivityText = styled.div`
  font-size: 14px;
  line-height: 20px;
  color: ${(p) => getColor({ theme: p.theme, variable: 'foreground.default' })};
  margin-bottom: 4px;
`;

const ActivityTime = styled.div`
  font-size: 12px;
  line-height: 16px;
  color: ${(p) => getColor({ theme: p.theme, variable: 'foreground.subtle' })};
`;

function HomePage() {
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [hasSavedProgress, setHasSavedProgress] = useState(false);

  useEffect(() => {
    // Verificar se há progresso salvo
    const checkProgress = () => {
      const saved = localStorage.getItem('migrationProgress');
      setHasSavedProgress(!!saved);
    };

    checkProgress();

    // Adicionar listener para detectar mudanças no localStorage
    window.addEventListener('storage', checkProgress);

    // Verificar periodicamente enquanto o modal está fechado
    const interval = setInterval(checkProgress, 500);

    return () => {
      window.removeEventListener('storage', checkProgress);
      clearInterval(interval);
    };
  }, []);

  const handleGetStarted = () => {
    setIsWizardOpen(true);
  };

  const handleLearnMore = () => {
    console.log('Learn more clicked');
    // Open documentation or info modal
  };

  const handleStartMigration = () => {
    console.log('Starting migration process...');
    // In real implementation, navigate to migration flow
  };

  return (
    <Container>
      <PageHeader>
        <Title>Welcome to Admin Center</Title>
        <Subtitle>Manage your account, people, channels, and settings</Subtitle>
      </PageHeader>

      <MigrationBanner
        onGetStarted={handleGetStarted}
        onLearnMore={handleLearnMore}
        hasSavedProgress={hasSavedProgress}
      />

      <MigrationWizard
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
        onStartMigration={handleStartMigration}
      />

      <Section>
        <SectionTitle>Account overview</SectionTitle>
        <Grid columns={4}>
          <MetricCard>
            <MetricHeader>
              <IconWrapper color="blue">
                <UserIcon />
              </IconWrapper>
              <MetricLabel>Total agents</MetricLabel>
            </MetricHeader>
            <MetricValue>247</MetricValue>
            <MetricChange $$isPositive>+12 this month</MetricChange>
          </MetricCard>

          <MetricCard>
            <MetricHeader>
              <IconWrapper color="green">
                <TicketIcon />
              </IconWrapper>
              <MetricLabel>Active tickets</MetricLabel>
            </MetricHeader>
            <MetricValue>1,432</MetricValue>
            <MetricChange $$isPositive>-8% from last week</MetricChange>
          </MetricCard>

          <MetricCard>
            <MetricHeader>
              <IconWrapper color="purple">
                <ChatIcon />
              </IconWrapper>
              <MetricLabel>Satisfaction score</MetricLabel>
            </MetricHeader>
            <MetricValue>94%</MetricValue>
            <MetricChange $$isPositive>+2% from last month</MetricChange>
          </MetricCard>

          <MetricCard>
            <MetricHeader>
              <IconWrapper color="blue">
                <TrendUpIcon />
              </IconWrapper>
              <MetricLabel>Avg response time</MetricLabel>
            </MetricHeader>
            <MetricValue>2.4h</MetricValue>
            <MetricChange $$isPositive>-15 min improvement</MetricChange>
          </MetricCard>
        </Grid>
      </Section>

      <Section>
        <SectionTitle>Quick actions</SectionTitle>
        <Grid columns={3}>
          <QuickActionCard>
            <IconWrapper>
              <PeopleIcon />
            </IconWrapper>
            <ActionTitle>Add team members</ActionTitle>
            <ActionDescription>Invite new agents and admins to your account</ActionDescription>
          </QuickActionCard>

          <QuickActionCard>
            <IconWrapper>
              <SettingsIcon />
            </IconWrapper>
            <ActionTitle>Configure channels</ActionTitle>
            <ActionDescription>Set up email, chat, and messaging channels</ActionDescription>
          </QuickActionCard>

          <QuickActionCard>
            <IconWrapper>
              <AppsIcon />
            </IconWrapper>
            <ActionTitle>Browse apps</ActionTitle>
            <ActionDescription>Extend Zendesk with integrations and apps</ActionDescription>
          </QuickActionCard>
        </Grid>
      </Section>

      <Section>
        <SectionTitle>Recent activity</SectionTitle>
        <ActivityList>
          <ActivityItem>
            <ActivityIcon>
              <CheckCircleIcon />
            </ActivityIcon>
            <ActivityContent>
              <ActivityText>
                <strong>Sarah Chen</strong> updated security settings
              </ActivityText>
              <ActivityTime>2 hours ago</ActivityTime>
            </ActivityContent>
          </ActivityItem>

          <ActivityItem>
            <ActivityIcon>
              <UserIcon />
            </ActivityIcon>
            <ActivityContent>
              <ActivityText>
                <strong>3 new agents</strong> added to Support team
              </ActivityText>
              <ActivityTime>4 hours ago</ActivityTime>
            </ActivityContent>
          </ActivityItem>

          <ActivityItem>
            <ActivityIcon>
              <AppsIcon />
            </ActivityIcon>
            <ActivityContent>
              <ActivityText>
                <strong>Slack integration</strong> was enabled
              </ActivityText>
              <ActivityTime>Yesterday at 3:45 PM</ActivityTime>
            </ActivityContent>
          </ActivityItem>

          <ActivityItem>
            <ActivityIcon>
              <SettingsIcon />
            </ActivityIcon>
            <ActivityContent>
              <ActivityText>
                <strong>Email channel</strong> configuration updated
              </ActivityText>
              <ActivityTime>Yesterday at 10:22 AM</ActivityTime>
            </ActivityContent>
          </ActivityItem>
        </ActivityList>
      </Section>

      <Section>
        <Button isPrimary>View all settings</Button>
      </Section>
    </Container>
  );
}

export default HomePage;
