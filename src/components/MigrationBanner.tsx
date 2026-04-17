import styled from 'styled-components';
import { Button } from '@zendeskgarden/react-buttons';
import { Tag } from '@zendeskgarden/react-tags';
import { getColor } from '@zendeskgarden/react-theming';

const BannerContainer = styled.div`
  background: ${(p) => getColor({ theme: p.theme, variable: 'background.default' })};
  border: 1px solid ${(p) => getColor({ theme: p.theme, hue: 'grey', shade: 200 })};
  border-radius: 24px;
  overflow: hidden;
  position: relative;
  width: 100%;
  margin-bottom: 32px;
`;

const GreyArea = styled.div`
  position: absolute;
  background: rgba(246, 245, 244, 0.6);
  left: 6px;
  top: 6px;
  right: 6px;
  bottom: 6px;
  overflow: hidden;
  border-radius: 18px;
`;

const BackgroundBlurry = styled.div`
  position: absolute;
  height: 224px;
  right: 150px;
  top: -2px;
  width: 350px;
`;

const BlurCircle1 = styled.div`
  position: absolute;
  background: rgba(181, 135, 225, 0.7);
  filter: blur(36px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  height: 156px;
  left: 100px;
  opacity: 0.8;
  border-radius: 102px;
  top: 17px;
  width: 169px;
`;

const BlurCircle2 = styled.div`
  position: absolute;
  background: rgba(127, 153, 233, 0.5);
  filter: blur(36px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  height: 177px;
  right: 20px;
  opacity: 0.8;
  border-radius: 100px;
  top: 103px;
  width: 214px;
`;

const ChatPreview = styled.div`
  position: absolute;
  right: 150px;
  top: 17px;
  border: 1px solid ${(p) => getColor({ theme: p.theme, variable: 'background.default' })};
  border-radius: 10px;
  padding: 8px;
  background: ${(p) => getColor({ theme: p.theme, variable: 'background.default' })};
  box-shadow: 0px 4px 8px 0px rgba(47, 57, 65, 0.2);
`;

const ContentLeft = styled.div`
  position: relative;
  padding: 28px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  border-radius: 20px;
  width: 100%;
  z-index: 1;
`;

const MainText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

const TextSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: 600;
  line-height: 24px;
  letter-spacing: -0.45px;
  color: ${(p) => getColor({ theme: p.theme, variable: 'foreground.default' })};
  margin: 0;
`;

const Description = styled.p`
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.154px;
  color: ${(p) => getColor({ theme: p.theme, variable: 'foreground.default' })};
  margin: 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

// Placeholder chat illustration (using a simple SVG as placeholder)
const ChatIllustration = () => (
  <svg width="166" height="255" viewBox="0 0 166 255" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="166" height="255" rx="5" fill="white"/>
    <rect x="10" y="10" width="146" height="30" rx="4" fill="#F6F5F4"/>
    <circle cx="30" cy="70" r="15" fill="#D6D0EB"/>
    <rect x="50" y="60" width="90" height="20" rx="4" fill="#E8E5F4"/>
    <circle cx="136" cy="120" r="15" fill="#1F73B7"/>
    <rect x="26" y="110" width="90" height="20" rx="4" fill="#D6EEF1"/>
    <rect x="10" y="220" width="146" height="25" rx="4" fill="#F6F5F4"/>
  </svg>
);

interface MigrationBannerProps {
  onGetStarted?: () => void;
  onLearnMore?: () => void;
  onClose?: () => void;
  hasSavedProgress?: boolean;
}

function MigrationBanner({ onGetStarted, onLearnMore, hasSavedProgress }: MigrationBannerProps) {
  return (
    <BannerContainer>
      <GreyArea>
        <BackgroundBlurry>
          <BlurCircle1 />
          <BlurCircle2 />
        </BackgroundBlurry>
        <ChatPreview>
          <ChatIllustration />
        </ChatPreview>
      </GreyArea>

      <ContentLeft>
        <MainText>
          <TextSection>
            <div style={{ display: 'flex' }}>
              <Tag isPill>
                <span>Complete by June 1st</span>
              </Tag>
            </div>
            <Title>Your Messenger responses are being moved</Title>
            <Description>
              Your automated responses are moving to the new AI agent dashboard. You can start the migration now, and start exploring.
            </Description>
          </TextSection>

          <ButtonGroup>
            <Button isPrimary size="small" onClick={onGetStarted}>
              {hasSavedProgress ? 'Continue migration' : 'Get started'}
            </Button>
            <Button size="small" onClick={onLearnMore}>
              Learn more
            </Button>
          </ButtonGroup>
        </MainText>
      </ContentLeft>
    </BannerContainer>
  );
}

export default MigrationBanner;
