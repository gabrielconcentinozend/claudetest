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
  min-height: 180px;
  margin-bottom: 32px;
`;

const GreyArea = styled.div`
  position: absolute;
  background: rgba(246, 245, 244, 0.4);
  left: 6px;
  top: 6px;
  right: 6px;
  bottom: 6px;
  overflow: hidden;
  border-radius: 18px;
  display: flex;
  gap: 60px;
  padding: 16px 40px 16px 20px;
`;

const BackgroundBlurryWrapper = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 352px;
  width: 656px;
  right: -219px;
  top: -133px;
  z-index: 0;
`;

const BackgroundBlurry = styled.div`
  position: relative;
  height: 269.55px;
  width: 617.99px;
  transform: rotate(8.01deg) skewX(-1.41deg);
`;

const BlurCircle1 = styled.div`
  position: absolute;
  background: rgba(181, 135, 225, 0.7);
  filter: blur(36px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  height: 156px;
  width: 169px;
  opacity: 0.8;
  border-radius: 102.61px;
  left: 50%;
  transform: translateX(calc(-50% - 58.49px));
  top: 17px;
`;

const BlurCircle2 = styled.div`
  position: absolute;
  background: rgba(127, 153, 233, 0.5);
  filter: blur(36px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  height: 177px;
  width: 214px;
  opacity: 0.8;
  border-radius: 100px;
  left: 50%;
  transform: translateX(calc(-50% + 79.01px));
  top: 103px;
`;

const ChatPreview = styled.div`
  position: absolute;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  bottom: 0;
  right: 120px;
  z-index: 2;
`;

const ContentLeft = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: flex-start;
  justify-content: center;
  flex: 1;
  min-width: 0;
  z-index: 1;
`;

const TextSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
  justify-content: center;
`;

const TagWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-start;
`;

const Title = styled.h2`
  font-family: 'SF Pro Text', sans-serif;
  font-size: 18px;
  font-weight: 600;
  line-height: 24px;
  letter-spacing: -0.45px;
  color: ${(p) => getColor({ theme: p.theme, variable: 'foreground.default' })};
  margin: 0;
  white-space: nowrap;
`;

const Description = styled.p`
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.154px;
  color: #11121a;
  margin: 0;
  width: min-content;
  min-width: 100%;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const ChatImage = styled.img`
  display: block;
  height: auto;
  width: 150px;
`;

const ChatIllustration = () => (
  <ChatImage src={`${import.meta.env.BASE_URL}chat-banner-real.png`} alt="Chat illustration" />
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
        <ContentLeft>
          <TextSection>
            <TagWrapper>
              <Tag isPill size="small">
                <span>Complete by June 1st</span>
              </Tag>
              <Title>Your Messenger responses are being moved</Title>
            </TagWrapper>
            <Description>
              Your automated responses are moving to the new AI agent dashboard. Start the migration now, and start exploring.
            </Description>
          </TextSection>

          <ButtonGroup>
            <Button isPrimary size="small" onClick={onGetStarted}>
              {hasSavedProgress ? 'Continue migration' : 'Start assisted migration'}
            </Button>
            <Button size="small" onClick={onLearnMore}>
              Learn more
            </Button>
          </ButtonGroup>
        </ContentLeft>

        <BackgroundBlurryWrapper>
          <BackgroundBlurry>
            <BlurCircle1 />
            <BlurCircle2 />
          </BackgroundBlurry>
        </BackgroundBlurryWrapper>

        <ChatPreview>
          <ChatIllustration />
        </ChatPreview>
      </GreyArea>
    </BannerContainer>
  );
}

export default MigrationBanner;
