import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Modal, Body, Close } from '@zendeskgarden/react-modals';
import { Button } from '@zendeskgarden/react-buttons';
import { Anchor } from '@zendeskgarden/react-buttons';
import { Checkbox, Label, Field, Textarea, Hint, Input } from '@zendeskgarden/react-forms';
import { Tabs, TabList, Tab, TabPanel } from '@zendeskgarden/react-tabs';
import { Dots } from '@zendeskgarden/react-loaders';
import { Table, Head, HeaderRow, HeaderCell, Body as TableBody, Row, Cell } from '@zendeskgarden/react-tables';
import { getColor, ThemeProvider } from '@zendeskgarden/react-theming';
import XIcon from '@zendeskgarden/svg-icons/src/16/x-stroke.svg?react';
import ExternalLinkIcon from '@zendeskgarden/svg-icons/src/12/new-window-stroke.svg?react';
import ChevronDownIcon from '@zendeskgarden/svg-icons/src/16/chevron-down-stroke.svg?react';
import CheckIcon from '@zendeskgarden/svg-icons/src/16/check-sm-stroke.svg?react';
import UserCircleIcon from '@zendeskgarden/svg-icons/src/16/user-circle-stroke.svg?react';
import AlertErrorIcon from '@zendeskgarden/svg-icons/src/16/alert-error-stroke.svg?react';
import CheckCircleIcon from '@zendeskgarden/svg-icons/src/16/check-circle-stroke.svg?react';

// Intro Screen Styles
const IntroLeftContent = styled.div`
  flex: 0 0 526px;
  padding: 40px 32px 40px 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 40px;
`;

const IntroRightContent = styled.div`
  flex: 1;
  padding: 6px;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
`;

const GreyBackground = styled.div`
  background: rgba(246, 245, 244, 0.6);
  border-radius: 18px;
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const GradientCircle = styled.div<{ $variant: 'purple' | 'blue' }>`
  position: absolute;
  width: ${(p) => (p.$variant === 'purple' ? '400px' : '500px')};
  height: ${(p) => (p.$variant === 'purple' ? '400px' : '450px')};
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.7;
  background: ${(p) =>
    p.$variant === 'purple'
      ? 'radial-gradient(circle, rgba(181, 135, 225, 0.8) 0%, rgba(181, 135, 225, 0) 70%)'
      : 'radial-gradient(circle, rgba(127, 153, 233, 0.6) 0%, rgba(127, 153, 233, 0) 70%)'};
  ${(p) =>
    p.$variant === 'purple'
      ? `
    top: -100px;
    left: -150px;
  `
      : `
    bottom: -100px;
    right: -150px;
  `}
`;

const IllustrationContainer = styled.div`
  position: absolute;
  left: 80.88px;
  top: 97.52px;
  z-index: 1;
`;

const IllustrationImage = styled.img`
  display: block;
  width: 480px;
  height: auto;
`;

const MainText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const TextSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: 600;
  line-height: 24px;
  letter-spacing: -0.45px;
  color: ${(p) => getColor({ theme: p.theme, variable: 'foreground.default' })};
  margin: 0;
`;

const Description = styled.div`
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.154px;
  color: ${(p) => getColor({ theme: p.theme, variable: 'foreground.default' })};

  p {
    margin: 0 0 8px 0;
  }

  ul {
    margin: 8px 0;
    padding-left: 20px;
    list-style-type: disc;

    li {
      margin-bottom: 8px;

      strong {
        font-weight: 700;
      }
    }
  }
`;

const LearnMoreLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  line-height: 20px;
  color: ${(p) => getColor({ theme: p.theme, hue: 'blue', shade: 600 })};
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    color: ${(p) => getColor({ theme: p.theme, hue: 'blue', shade: 700 })};
  }

  svg {
    width: 12px;
    height: 12px;
  }
`;

const BonusCard = styled.div`
  background: ${(p) => getColor({ theme: p.theme, variable: 'background.default' })};
  border: 1px solid ${(p) => getColor({ theme: p.theme, variable: 'border.default' })};
  border-radius: 12px;
  padding: 12px 20px 12px 12px;
  display: flex;
  gap: 12px;
  align-items: center;
`;

const BonusIcon = styled.img`
  width: 50px;
  height: 36px;
  flex-shrink: 0;
  display: block;
`;

const BonusText = styled.p`
  font-size: 14px;
  line-height: 20px;
  margin: 0;
  color: ${(p) => getColor({ theme: p.theme, variable: 'foreground.default' })};

  strong {
    font-weight: 700;
  }
`;

// Stepper Flow Styles
// const StepperContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 40px;
//   padding: 40px;
//   position: relative;
//   flex: 1;
// `;

const StepperBody = styled(Body)`
  display: flex;
  flex-direction: row;
  padding: 0 !important;
  position: relative;
  overflow: hidden;
`;

const BackgroundGradient = styled.div`
  position: absolute;
  top: -400px;
  right: -400px;
  width: 904px;
  height: 918px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(181, 135, 225, 0.15) 0%, rgba(181, 135, 225, 0) 70%);
  pointer-events: none;
  z-index: 0;
`;

const StepperLeft = styled.div`
  width: 210px;
  padding: 40px 0 40px 40px;
  display: flex;
  flex-direction: column;
  gap: 0;
  position: relative;
  z-index: 1;
`;

const StepperRight = styled.div`
  flex: 1;
  padding: 40px 40px 100px 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
  z-index: 1;
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 600px;
`;

const StepperStep = styled.div`
  display: flex;
  flex-direction: column;
`;

const StepHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const StepIcon = styled.div<{ $active?: boolean; $completed?: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: 100px;
  background: ${(p) =>
    p.$active
      ? getColor({ theme: p.theme, hue: 'grey', shade: 700 })
      : getColor({ theme: p.theme, variable: 'background.subtle' })};
  color: ${(p) =>
    p.$active
      ? 'white'
      : getColor({ theme: p.theme, hue: 'grey', shade: 700 })};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  line-height: 16px;
  letter-spacing: -0.0004px;
  flex-shrink: 0;

  svg {
    width: 16px;
    height: 16px;
  }
`;

const StepLabel = styled.p<{ $active?: boolean }>`
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.154px;
  font-weight: ${(p) => (p.$active ? 600 : 400)};
  color: ${(p) =>
    p.$active
      ? getColor({ theme: p.theme, variable: 'foreground.default' })
      : getColor({ theme: p.theme, variable: 'foreground.subtle' })};
  margin: 0;
  flex: 1;
  white-space: nowrap;
`;

const StepConnector = styled.div`
  padding-left: 12px;
  padding-top: 6px;
  padding-bottom: 6px;
`;

const ConnectorLine = styled.div`
  border-left: 1px solid ${(p) => getColor({ theme: p.theme, variable: 'border.default' })};
  height: 100%;
  min-height: 20px;
  padding-left: 24px;
`;

const PageTitle = styled.h1`
  font-size: 26px;
  line-height: 32px;
  letter-spacing: 0.35px;
  font-weight: 400;
  color: #000000;
  margin: 0;
`;

const PageDescription = styled.p`
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.154px;
  color: ${(p) => getColor({ theme: p.theme, variable: 'foreground.default' })};
  margin: 0;
`;

const StyledTable = styled(Table)`
  border: 1px solid ${(p) => getColor({ theme: p.theme, variable: 'border.default' })};
  border-radius: 8px;
  overflow: hidden;
  width: 100%;
  background: transparent;

  th, td {
    vertical-align: middle;
    background: transparent !important;
  }

  thead, tbody, tr {
    background: transparent !important;
  }
`;

const CheckboxHeaderCell = styled(HeaderCell)`
  width: 50px;
  text-align: center;
`;

const CheckboxCell = styled(Cell)`
  width: 50px;
  text-align: center;
`;

const StatusHeaderCell = styled(HeaderCell)`
  width: 120px;
`;

const StatusCell = styled(Cell)`
  width: 120px;
`;

const ActionFooter = styled.div<{ $showPrevious?: boolean }>`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 80px;
  background: ${(p) => getColor({ theme: p.theme, variable: 'background.default' })};
  border-top: 1px solid ${(p) => getColor({ theme: p.theme, variable: 'border.subtle' })};
  display: flex;
  align-items: center;
  justify-content: ${(p) => (p.$showPrevious ? 'space-between' : 'flex-end')};
  padding: 0 40px;
  gap: 20px;
  z-index: 10;
`;

const MessengerCounter = styled.p`
  font-size: 12px;
  line-height: 16px;
  letter-spacing: -0.0004px;
  color: ${(p) => getColor({ theme: p.theme, hue: 'blue', shade: 600 })};
  margin: 0;
`;

const ExpandableCard = styled.div<{ $isExpanded?: boolean }>`
  background: ${(p) => getColor({ theme: p.theme, variable: 'background.default' })};
  border: 1px solid ${(p) => getColor({ theme: p.theme, variable: 'border.subtle' })};
  border-radius: 12px;
  padding: ${(p) => (p.$isExpanded ? '20px 32px 32px 32px' : '20px 32px')};
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.04);

  &:hover {
    border-color: ${(p) => getColor({ theme: p.theme, variable: 'border.default' })};
  }
`;

const CardHeader = styled.button`
  background: transparent;
  border: none;
  padding: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0;
`;

const CardTitle = styled.p`
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: -0.154px;
  color: ${(p) => getColor({ theme: p.theme, variable: 'foreground.default' })};
  margin: 0;
`;

const CardSubtitle = styled.p`
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.154px;
  color: ${(p) => getColor({ theme: p.theme, variable: 'foreground.subtle' })};
  margin: 0;
`;

const ChevronIcon = styled.div<{ $rotated?: boolean }>`
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(p) => getColor({ theme: p.theme, variable: 'foreground.default' })};
  transform: ${(p) => (p.$rotated ? 'rotate(180deg)' : 'rotate(0deg)')};
  transition: transform 0.2s ease;
`;

const ExpandedContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-start;
`;

const ScheduleDescription = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.154px;
  color: ${(p) => getColor({ theme: p.theme, variable: 'foreground.default' })};
`;

const ScheduleGrid = styled.div`
  border: 1px solid ${(p) => getColor({ theme: p.theme, variable: 'border.default' })};
  border-radius: 8px;
  padding: 20px;
  display: inline-flex;
  gap: 40px;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.154px;
`;

const ScheduleColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 76px;
`;

const DayLabel = styled.p<{ $isDay?: boolean }>`
  margin: 0;
  color: ${(p) =>
    p.$isDay
      ? getColor({ theme: p.theme, variable: 'foreground.default' })
      : getColor({ theme: p.theme, variable: 'foreground.subtle' })};
`;

// const StyledSelect = styled(Select)`
//   width: 100%;
// `;

// const FullWidthField = styled(Field)`
//   width: 100%;
// `;

const CustomDropdownContainer = styled.div`
  position: relative;
  width: 100%;
  margin-top: 8px;

  /* Prevent clicks from propagating to parent elements */
  * {
    pointer-events: auto;
  }
`;

const CustomDropdownTrigger = styled.button`
  width: 100%;
  background: ${(p) => getColor({ theme: p.theme, variable: 'background.default' })};
  border: 1px solid ${(p) => getColor({ theme: p.theme, hue: 'grey', shade: 400 })};
  border-radius: 4px;
  padding: 10px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.154px;
  color: ${(p) => getColor({ theme: p.theme, variable: 'foreground.default' })};
  font-family: 'SF Pro Text', sans-serif;

  &:hover {
    border-color: ${(p) => getColor({ theme: p.theme, hue: 'grey', shade: 600 })};
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

const CustomDropdownMenu = styled.div<{ $isOpen: boolean }>`
  display: ${(p) => (p.$isOpen ? 'block' : 'none')};
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  width: 100%;
  background: ${(p) => getColor({ theme: p.theme, variable: 'background.raised' })};
  border: 1px solid ${(p) => getColor({ theme: p.theme, variable: 'border.default' })};
  border-radius: 4px;
  box-shadow: 0px 16px 24px 0px rgba(10, 13, 14, 0.16);
  padding: 4px 1px;
  z-index: 1000;
`;

const CustomMenuHeader = styled.div`
  padding: 4px 12px;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: -0.154px;
  color: ${(p) => getColor({ theme: p.theme, variable: 'foreground.default' })};

  &:not(:first-child) {
    margin-top: 4px;
  }
`;

const CustomMenuSeparator = styled.div`
  height: 1px;
  background: ${(p) => getColor({ theme: p.theme, variable: 'border.subtle' })};
  margin: 4px 0;
`;

const CustomMenuItem = styled.button`
  width: 100%;
  background: transparent;
  border: none;
  padding: 4px 12px;
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.154px;
  color: ${(p) => getColor({ theme: p.theme, variable: 'foreground.default' })};
  font-family: 'SF Pro Text', sans-serif;
  text-align: left;

  &:hover {
    background: ${(p) => getColor({ theme: p.theme, variable: 'background.subtle' })};
  }
`;

const StyledTextarea = styled(Textarea)`
  min-height: 100px;
  resize: vertical;
`;

const CustomerDetailsCard = styled.div`
  background: ${(p) => getColor({ theme: p.theme, variable: 'background.default' })};
  border: 1px solid ${(p) => getColor({ theme: p.theme, variable: 'border.default' })};
  border-radius: 4px;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  margin-top: 8px;
`;

const CustomerDetailsIcon = styled.div`
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(p) => getColor({ theme: p.theme, variable: 'foreground.default' })};
`;

const CustomerDetailsText = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0;
`;

const CustomerDetailsTitle = styled.p`
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: -0.154px;
  color: ${(p) => getColor({ theme: p.theme, variable: 'foreground.default' })};
  margin: 0;
`;

const CustomerDetailsSubtitle = styled.p`
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.154px;
  color: ${(p) => getColor({ theme: p.theme, variable: 'foreground.subtle' })};
  margin: 0;
`;

const StyledTabs = styled(Tabs)`
  width: 100%;
`;

const StyledTabList = styled(TabList)`
  width: 100%;
`;

const MigrationCard = styled.div`
  background: ${(p) => getColor({ theme: p.theme, variable: 'background.default' })};
  border: 1px solid ${(p) => getColor({ theme: p.theme, variable: 'border.default' })};
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

const MigrationCardTitle = styled.p`
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: -0.154px;
  color: ${(p) => getColor({ theme: p.theme, variable: 'foreground.default' })};
  margin: 0;
`;

const MigrationStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const MigrationStatusText = styled.p<{ $isWaiting?: boolean; $isDone?: boolean }>`
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.154px;
  color: ${(p) => {
    if (p.$isDone) return getColor({ theme: p.theme, hue: 'green', shade: 600 });
    return getColor({ theme: p.theme, variable: 'foreground.subtle' });
  }};
  margin: 0;
`;

const StatusIndicator = styled.div<{ $isSuccess?: boolean }>`
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    color: ${(p) => p.$isSuccess ? getColor({ theme: p.theme, hue: 'green', shade: 600 }) : 'inherit'};
  }
`;


const CloseButton = styled(Close)`
  position: absolute;
  top: 4px;
  right: 4px;
  z-index: 10;
`;

const SuccessContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0;
  height: 600px;
  position: relative;
  overflow: hidden;
`;

const SuccessLeft = styled.div`
  flex: 0 0 450px;
  padding: 40px 32px 40px 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 40px;
  position: relative;
  z-index: 1;
`;

const SuccessRight = styled.div`
  flex: 1;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
`;

const SuccessGradient1 = styled.div`
  position: absolute;
  width: 672.985px;
  height: 672.985px;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.8;
  background: radial-gradient(circle, rgba(181, 135, 225, 0.5) 0%, rgba(181, 135, 225, 0) 70%);
  top: -331px;
  left: 450px;
  transform: rotate(-52.43deg);
  pointer-events: none;
  z-index: 0;
`;

const SuccessGradient2 = styled.div`
  position: absolute;
  width: 651.415px;
  height: 766.559px;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.7;
  background: radial-gradient(circle, rgba(127, 153, 233, 0.4) 0%, rgba(127, 153, 233, 0) 70%);
  top: -120px;
  left: 237px;
  transform: rotate(-39.88deg);
  pointer-events: none;
  z-index: 0;
`;

const SuccessHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const SuccessCheckIcon = styled.div`
  width: 16px;
  height: 16px;
  background: ${(p) => getColor({ theme: p.theme, hue: 'green', shade: 600 })};
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  svg {
    width: 16px;
    height: 16px;
    color: white;
  }
`;

const ChatIllustrationContainer = styled.div`
  position: relative;
  width: 450px;
  height: 350px;
  z-index: 1;
`;

const ResumeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

const ResumeCard = styled.div`
  background: ${(p) => getColor({ theme: p.theme, variable: 'background.default' })};
  border: 1px solid ${(p) => getColor({ theme: p.theme, variable: 'border.default' })};
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

const ResumeSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ResumeSectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 11px;
`;

const ResumeSectionIcon = styled.div<{ $type: 'pending' | 'reviewed' }>`
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: ${(p) =>
    p.$type === 'pending'
      ? getColor({ theme: p.theme, hue: 'yellow', shade: 600 })
      : getColor({ theme: p.theme, hue: 'green', shade: 600 })
  };
`;

const ResumeSectionTitle = styled.p`
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: -0.154px;
  color: ${(p) => getColor({ theme: p.theme, variable: 'foreground.default' })};
  margin: 0;
`;

const ResumeChannelList = styled.ul`
  margin: 0;
  padding-left: 27px;
  list-style-type: disc;
`;

const ResumeChannelItem = styled.li`
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.154px;
  color: ${(p) => getColor({ theme: p.theme, variable: 'foreground.default' })};
`;

const ResumeSeparator = styled.div`
  height: 1px;
  background: ${(p) => getColor({ theme: p.theme, variable: 'border.default' })};
  width: 100%;
`;

interface MigrationWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onStartMigration: () => void;
}

let preventModalClose = false;

interface Channel {
  id: string;
  name: string;
  channel: string;
  status: string;
  selected: boolean;
  reviewed?: boolean;
}

function MigrationWizard({ isOpen, onClose, onStartMigration }: MigrationWizardProps) {
  const [showStepper, setShowStepper] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [channels, setChannels] = useState<Channel[]>([
    { id: '1', name: "Joe's Coffee", channel: 'iOS', status: 'Active', selected: true },
    { id: '2', name: 'Messenger88', channel: 'Web Widget', status: 'Inactive', selected: false },
    { id: '3', name: 'Messenger iOS', channel: 'iOS', status: 'Active', selected: true },
  ]);
  const [expandedCards, setExpandedCards] = useState<{ [key: string]: boolean }>({
    businessHours: false,
    responses: false,
  });
  const [selectedSchedule, setSelectedSchedule] = useState('Custom schedule');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState('during');
  const [firstMessage, setFirstMessage] = useState('Hi, how can I help you?');
  const [followUpMessage, setFollowUpMessage] = useState('Bye, have a nice day!');
  const [currentMessengerIndex, setCurrentMessengerIndex] = useState(0);
  const [agentName, setAgentName] = useState('');
  const [agentLanguage, setAgentLanguage] = useState('English');
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const [migrationSteps, setMigrationSteps] = useState<{ [key: string]: number }>({});
  const [currentMigratingIndex, setCurrentMigratingIndex] = useState(0);
  const [showSuccessScreen, setShowSuccessScreen] = useState(false);
  const [showResumeScreen, setShowResumeScreen] = useState(false);
  const [savedProgress, setSavedProgress] = useState<{
    currentStep: number;
    currentMessengerIndex: number;
    reviewedChannels: string[];
  } | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const languageDropdownRef = useRef<HTMLDivElement>(null);

  // Carregar progresso salvo do localStorage quando o modal abre
  useEffect(() => {
    if (isOpen) {
      const saved = localStorage.getItem('migrationProgress');
      if (saved) {
        const progress = JSON.parse(saved);
        setSavedProgress(progress);
        // Abrir direto na tela de resumo
        setShowResumeScreen(true);
        setShowStepper(true);
        setCurrentStep(progress.currentStep);
      }
    }
  }, [isOpen]);

  // Limpar progresso quando chega na tela de sucesso
  useEffect(() => {
    if (showSuccessScreen) {
      localStorage.removeItem('migrationProgress');
      setSavedProgress(null);
    }
  }, [showSuccessScreen]);

  const migrationStepLabels = [
    'Checking responses',
    'Configuring AI agent',
    'Setting it up in the AI agent dashboard',
    'Done'
  ];

  const selectedChannels = channels.filter(ch => ch.selected);
  const showMessengerCounter = selectedChannels.length > 1;
  const currentMessenger = selectedChannels[currentMessengerIndex];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
      if (languageDropdownRef.current && !languageDropdownRef.current.contains(event.target as Node)) {
        setLanguageDropdownOpen(false);
      }
    };

    if (dropdownOpen || languageDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen, languageDropdownOpen]);

  // Simular progressão da migração
  useEffect(() => {
    if (currentStep !== 4) return;

    const selected = channels.filter(ch => ch.selected);
    if (selected.length === 0 || currentMigratingIndex >= selected.length) return;

    const currentChannel = selected[currentMigratingIndex];

    // Simular progressão para o canal atual (2 segundos entre cada etapa)
    const timeout0 = setTimeout(() => {
      setMigrationSteps(prev => ({ ...prev, [currentChannel.id]: 0 }));
    }, 100);

    const timeout1 = setTimeout(() => {
      setMigrationSteps(prev => ({ ...prev, [currentChannel.id]: 1 }));
    }, 2100);

    const timeout2 = setTimeout(() => {
      setMigrationSteps(prev => ({ ...prev, [currentChannel.id]: 2 }));
    }, 4100);

    const timeout3 = setTimeout(() => {
      setMigrationSteps(prev => ({ ...prev, [currentChannel.id]: 3 }));
    }, 6100);

    // Quando terminar, ir para o próximo canal ou mostrar tela de sucesso
    const timeoutNext = setTimeout(() => {
      if (currentMigratingIndex < selected.length - 1) {
        setCurrentMigratingIndex(prev => prev + 1);
      } else {
        // Todos os canais concluídos, mostrar tela de sucesso
        setShowSuccessScreen(true);
      }
    }, 6200);

    return () => {
      clearTimeout(timeout0);
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      clearTimeout(timeout3);
      clearTimeout(timeoutNext);
    };
  }, [currentStep, currentMigratingIndex, channels]);

  const handleStartClick = () => {
    // Apenas ativa o stepper (o useEffect já cuidou de carregar o progresso)
    setShowStepper(true);
    onStartMigration();
  };

  const handleResumeFromSaved = () => {
    if (savedProgress) {
      setCurrentStep(savedProgress.currentStep);
      setCurrentMessengerIndex(savedProgress.currentMessengerIndex);
      setShowResumeScreen(false);
    }
  };

  // const handleClearProgress = () => {
  //   localStorage.removeItem('migrationProgress');
  //   setSavedProgress(null);
  //   setShowResumeScreen(false);
  //   setCurrentStep(1);
  //   setCurrentMessengerIndex(0);
  // };

  const handleCheckboxChange = (id: string) => {
    setChannels(channels.map(ch => ch.id === id ? { ...ch, selected: !ch.selected } : ch));
  };

  const allSelected = channels.every(ch => ch.selected);

  const handleSelectAll = () => {
    setChannels(prevChannels => {
      const areAllSelected = prevChannels.every(ch => ch.selected);
      return prevChannels.map(ch => ({ ...ch, selected: !areAllSelected }));
    });
  };

  const handleNext = () => {
    // Se estamos no Step 2 e há múltiplos canais selecionados
    if (currentStep === 2 && selectedChannels.length > 1) {
      // Se ainda há mais canais para revisar
      if (currentMessengerIndex < selectedChannels.length - 1) {
        setCurrentMessengerIndex(currentMessengerIndex + 1);
        return;
      }
      // Se já revisamos todos, resetar o índice e avançar para o próximo step
      setCurrentMessengerIndex(0);
    }

    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    // Se estamos no Step 2 e há múltiplos canais selecionados
    if (currentStep === 2 && selectedChannels.length > 1) {
      // Se não estamos no primeiro canal, voltar para o anterior
      if (currentMessengerIndex > 0) {
        setCurrentMessengerIndex(currentMessengerIndex - 1);
        return;
      }
    }

    // Caso contrário, voltar para o step anterior
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      // Resetar o índice ao voltar do Step 2
      if (currentStep === 2) {
        setCurrentMessengerIndex(0);
      }
    }
  };

  const handleSaveAndExit = () => {
    let reviewedChannelIds: string[];

    // Se está no step 3 (AI agent), todos os canais foram revisados
    // Se está no step 2 (review responses), apenas os anteriores ao atual foram revisados
    if (currentStep === 3) {
      reviewedChannelIds = selectedChannels.map(ch => ch.id);
    } else {
      reviewedChannelIds = selectedChannels
        .slice(0, currentMessengerIndex)
        .map(ch => ch.id);
    }

    // Salvar progresso
    const progress = {
      currentStep,
      currentMessengerIndex,
      reviewedChannels: reviewedChannelIds,
    };

    setSavedProgress(progress);
    localStorage.setItem('migrationProgress', JSON.stringify(progress));

    // Marcar canais como revisados
    setChannels(channels.map(ch => ({
      ...ch,
      reviewed: reviewedChannelIds.includes(ch.id) ? true : ch.reviewed
    })));

    // Resetar estados antes de fechar
    setShowStepper(false);
    setShowResumeScreen(false);
    setCurrentStep(1);
    setCurrentMessengerIndex(0);

    onClose();
  };

  const toggleCard = (cardKey: string) => {
    setExpandedCards((prev) => ({
      ...prev,
      [cardKey]: !prev[cardKey],
    }));
  };

  const handleScheduleSelect = (value: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    preventModalClose = true;
    setSelectedSchedule(value);
    setDropdownOpen(false);
    setTimeout(() => {
      preventModalClose = false;
    }, 100);
  };

  const handleLanguageSelect = (value: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    preventModalClose = true;
    setAgentLanguage(value);
    setLanguageDropdownOpen(false);
    setTimeout(() => {
      preventModalClose = false;
    }, 100);
  };

  const handleModalClose = () => {
    if (!preventModalClose) {
      // Resetar estados quando fecha o modal
      setShowStepper(false);
      setShowResumeScreen(false);
      setCurrentStep(1);
      setCurrentMessengerIndex(0);
      setShowSuccessScreen(false);
      setMigrationSteps({});
      setCurrentMigratingIndex(0);
      onClose();
    }
  };

  if (!isOpen) return null;

  const steps = [
    { number: 1, label: 'Select channels' },
    { number: 2, label: 'Review responses' },
    { number: 3, label: 'Set up AI agent' },
    { number: 4, label: 'Complete migration' },
  ];

  return (
    <ThemeProvider>
      <Modal
        onClose={handleModalClose}
        style={{
          maxWidth: '900px',
          width: '90vw',
          height: '600px',
          borderRadius: '24px',
          overflow: 'hidden'
        }}
      >
        <CloseButton aria-label="Close modal">
          <XIcon />
        </CloseButton>

        {showSuccessScreen ? (
          <Body style={{ padding: 0 }}>
            <SuccessContainer>
              <SuccessGradient1 />
              <SuccessGradient2 />

              <SuccessLeft>
                <MainText>
                  <TextSection>
                    <SuccessHeader>
                      <SuccessCheckIcon>
                        <CheckIcon />
                      </SuccessCheckIcon>
                      <Title>Messenger responses moved</Title>
                    </SuccessHeader>
                    <Description>
                      <p>
                        Your existing greetings and follow-up responses are now active and managed by your AI agent.
                        Other Messenger settings, like notifications and authentication, remain in Admin Center.
                      </p>
                    </Description>
                    <LearnMoreLink href="#" onClick={(e) => e.preventDefault()}>
                      Learn more about the migration
                      <ExternalLinkIcon />
                    </LearnMoreLink>
                  </TextSection>
                </MainText>

                <a
                  href={import.meta.env.DEV
                    ? "http://localhost:5180/?from=migration"
                    : "https://zendesk.github.io/prototype-ai-agents-dashboard/?from=migration"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none' }}
                >
                  <Button isPrimary style={{ width: 'fit-content' }}>
                    Go to AI agents dashboard
                  </Button>
                </a>
              </SuccessLeft>

              <SuccessRight>
                <ChatIllustrationContainer>
                  <img
                    src={`${import.meta.env.BASE_URL}chat-success.svg`}
                    alt="Chat illustration"
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  />
                </ChatIllustrationContainer>
              </SuccessRight>
            </SuccessContainer>
          </Body>
        ) : !showStepper ? (
          <Body style={{ display: 'flex', flexDirection: 'row', padding: 0, minHeight: '500px' }}>
            <IntroLeftContent>
              <MainText>
                <TextSection>
                  <Title>A new home for your messenger responses</Title>
                  <Description>
                    <p>
                      To centralize how automation is orchestrated across Zendesk products, messenger
                      responses will now be managed in the AI agents dashboard. Here's what you need to know:
                    </p>
                    <ul>
                      <li>
                        <strong>No changes to customer experience:</strong> your customers will continue to
                        receive the same responses they're used to — nothing changes on their end.
                      </li>
                      <li>
                        <strong>No cost adjustments:</strong> your current pricing will not change.
                      </li>
                      <li>
                        <strong>No service interruption:</strong> this transition happens seamlessly, with
                        zero downtime.
                      </li>
                    </ul>
                  </Description>
                  <LearnMoreLink href="#" onClick={(e) => e.preventDefault()}>
                    Learn more about the migration
                    <ExternalLinkIcon />
                  </LearnMoreLink>
                </TextSection>

                <BonusCard>
                  <BonusIcon src={`${import.meta.env.BASE_URL}bonus-icon.svg`} alt="Bonus icon" />
                  <BonusText>
                    <strong>An added bonus:</strong> if you're ready to take the next step in automation,
                    you'll already be set up to start leveraging new AI agent capabilities in just a few
                    clicks.
                  </BonusText>
                </BonusCard>
              </MainText>

              <Button isPrimary onClick={handleStartClick} style={{ width: '186px' }}>
                Start assisted migration
              </Button>
            </IntroLeftContent>

            <IntroRightContent>
              <GreyBackground>
                <GradientCircle $variant="purple" />
                <GradientCircle $variant="blue" />
                <IllustrationContainer>
                  <IllustrationImage src={`${import.meta.env.BASE_URL}wizard-illustration.png`} alt="Admin Center illustration" />
                </IllustrationContainer>
              </GreyBackground>
            </IntroRightContent>
          </Body>
        ) : (
          <StepperBody>
            <BackgroundGradient />
            <StepperLeft>
              {steps.map((step, index) => {
                const isCompleted = step.number < currentStep;
                const isActive = step.number === currentStep;
                return (
                  <StepperStep key={step.number}>
                    <StepHeader>
                      <StepIcon $active={isActive} $completed={isCompleted}>
                        {isCompleted ? <CheckIcon /> : step.number}
                      </StepIcon>
                      <StepLabel $active={isActive}>{step.label}</StepLabel>
                    </StepHeader>
                    {index < steps.length - 1 && (
                      <StepConnector>
                        <ConnectorLine />
                      </StepConnector>
                    )}
                  </StepperStep>
                );
              })}
            </StepperLeft>

            <StepperRight>
              {showResumeScreen && savedProgress ? (
                <ResumeContainer>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <PageTitle>Finish moving Messenger responses</PageTitle>
                    <PageDescription>
                      Complete your remaining reviews to move your channels to the AI agents dashboard.
                      You can make further changes there after the migration is finished.
                    </PageDescription>
                  </div>

                  <ResumeCard>
                    <ResumeSection>
                      <ResumeSectionHeader>
                        <ResumeSectionIcon $type="pending">
                          <AlertErrorIcon />
                        </ResumeSectionIcon>
                        <ResumeSectionTitle>Pending</ResumeSectionTitle>
                      </ResumeSectionHeader>
                      <ResumeChannelList>
                        {/* Se parou no step 2 (review responses), mostrar canais não revisados */}
                        {savedProgress.currentStep === 2 && selectedChannels
                          .filter(ch => !savedProgress.reviewedChannels.includes(ch.id))
                          .map(ch => (
                            <ResumeChannelItem key={ch.id}>{ch.name}</ResumeChannelItem>
                          ))}
                        {/* Se parou no step 3 (AI agent), mostrar "AI agent creation" */}
                        {savedProgress.currentStep === 3 && (
                          <ResumeChannelItem>AI agent creation</ResumeChannelItem>
                        )}
                      </ResumeChannelList>
                    </ResumeSection>

                    <ResumeSeparator />

                    <ResumeSection>
                      <ResumeSectionHeader>
                        <ResumeSectionIcon $type="reviewed">
                          <CheckCircleIcon />
                        </ResumeSectionIcon>
                        <ResumeSectionTitle>Reviewed</ResumeSectionTitle>
                      </ResumeSectionHeader>
                      <ResumeChannelList>
                        {selectedChannels
                          .filter(ch => savedProgress.reviewedChannels.includes(ch.id))
                          .map(ch => (
                            <ResumeChannelItem key={ch.id}>{ch.name}</ResumeChannelItem>
                          ))}
                      </ResumeChannelList>
                    </ResumeSection>
                  </ResumeCard>
                </ResumeContainer>
              ) : null}

              {!showResumeScreen && (
                <>
              {currentStep === 1 && (
                <>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <PageTitle>Select Messenger channels</PageTitle>
                    <PageDescription>
                      Select the channels to manage in the AI agents dashboard. Any messengers you don't migrate will be permanently deleted.
                    </PageDescription>
                  </div>

                  <StyledTable>
                    <Head>
                      <HeaderRow>
                        <CheckboxHeaderCell>
                          <Field>
                            <Checkbox checked={allSelected} onChange={handleSelectAll}>
                              <Label hidden>Select all</Label>
                            </Checkbox>
                          </Field>
                        </CheckboxHeaderCell>
                        <HeaderCell>Name</HeaderCell>
                        <StatusHeaderCell>Channel</StatusHeaderCell>
                        <StatusHeaderCell>Status</StatusHeaderCell>
                      </HeaderRow>
                    </Head>
                    <TableBody>
                      {channels.map((channel) => (
                        <Row key={channel.id}>
                          <CheckboxCell>
                            <Field>
                              <Checkbox checked={channel.selected} onChange={() => handleCheckboxChange(channel.id)}>
                                <Label hidden>{channel.name}</Label>
                              </Checkbox>
                            </Field>
                          </CheckboxCell>
                          <Cell>{channel.name}</Cell>
                          <StatusCell>{channel.channel}</StatusCell>
                          <StatusCell>{channel.status}</StatusCell>
                        </Row>
                      ))}
                    </TableBody>
                  </StyledTable>
                </>
              )}

              {currentStep === 2 && currentMessenger && (
                <>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {showMessengerCounter && (
                      <MessengerCounter>
                        Messenger {currentMessengerIndex + 1} of {selectedChannels.length}
                      </MessengerCounter>
                    )}
                    <PageTitle>{currentMessenger.name}</PageTitle>
                    <PageDescription>
                      Review the settings for this channel. You can make changes or keep your current settings as they are.
                    </PageDescription>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
                    {/* Business Hours Card */}
                    <ExpandableCard $isExpanded={expandedCards.businessHours}>
                      <CardHeader onClick={() => toggleCard('businessHours')}>
                        <CardContent>
                          <CardTitle>Business hours</CardTitle>
                          {!expandedCards.businessHours && (
                            <CardSubtitle>{selectedSchedule}</CardSubtitle>
                          )}
                        </CardContent>
                        <ChevronIcon $rotated={expandedCards.businessHours}>
                          <ChevronDownIcon />
                        </ChevronIcon>
                      </CardHeader>

                      {expandedCards.businessHours && (
                        <ExpandedContent>
                          <ScheduleDescription>
                            <span>Set responses based on your schedule.</span>
                            <Anchor href="#" isExternal>
                              Manage schedules
                            </Anchor>
                          </ScheduleDescription>

                          <CustomDropdownContainer ref={dropdownRef} onClick={(e) => e.stopPropagation()}>
                            <CustomDropdownTrigger
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setDropdownOpen(!dropdownOpen);
                              }}
                            >
                              {selectedSchedule}
                              <ChevronDownIcon />
                            </CustomDropdownTrigger>
                            <CustomDropdownMenu $isOpen={dropdownOpen}>
                              <CustomMenuHeader>No schedule</CustomMenuHeader>
                              <CustomMenuSeparator />
                              <CustomMenuItem
                                type="button"
                                onClick={(e) => handleScheduleSelect('Always online', e)}
                              >
                                Always online
                              </CustomMenuItem>
                              <CustomMenuHeader>Schedule</CustomMenuHeader>
                              <CustomMenuSeparator />
                              <CustomMenuItem
                                type="button"
                                onClick={(e) => handleScheduleSelect('Custom schedule', e)}
                              >
                                Custom schedule
                              </CustomMenuItem>
                            </CustomDropdownMenu>
                          </CustomDropdownContainer>

                          {selectedSchedule === 'Custom schedule' && (
                            <ScheduleGrid>
                              <ScheduleColumn>
                                <DayLabel $isDay>Sunday</DayLabel>
                                <DayLabel $isDay>Monday</DayLabel>
                                <DayLabel $isDay>Tuesday</DayLabel>
                                <DayLabel $isDay>Wednesday</DayLabel>
                                <DayLabel $isDay>Thursday</DayLabel>
                                <DayLabel $isDay>Friday</DayLabel>
                                <DayLabel $isDay>Saturday</DayLabel>
                              </ScheduleColumn>
                              <ScheduleColumn>
                                <DayLabel>Closed</DayLabel>
                                <DayLabel>9am-5pm</DayLabel>
                                <DayLabel>9am-5pm</DayLabel>
                                <DayLabel>9am-5pm</DayLabel>
                                <DayLabel>9am-5pm</DayLabel>
                                <DayLabel>9am-5pm</DayLabel>
                                <DayLabel>Closed</DayLabel>
                              </ScheduleColumn>
                            </ScheduleGrid>
                          )}
                        </ExpandedContent>
                      )}
                    </ExpandableCard>

                    {/* Responses Card */}
                    <ExpandableCard $isExpanded={expandedCards.responses}>
                      <CardHeader onClick={() => toggleCard('responses')}>
                        <CardContent>
                          <CardTitle>Responses</CardTitle>
                          {!expandedCards.responses && (
                            <CardSubtitle>{firstMessage || 'No message set'}</CardSubtitle>
                          )}
                        </CardContent>
                        <ChevronIcon $rotated={expandedCards.responses}>
                          <ChevronDownIcon />
                        </ChevronIcon>
                      </CardHeader>

                      {expandedCards.responses && (
                        <ExpandedContent>
                          <StyledTabs selectedItem={selectedTab} onChange={setSelectedTab}>
                            <StyledTabList>
                              <Tab item="during">During business hours</Tab>
                              {selectedSchedule === 'Custom schedule' && (
                                <Tab item="outside">Outside business hours</Tab>
                              )}
                            </StyledTabList>
                            <TabPanel item="during">
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingTop: '12px' }}>
                                <Field>
                                  <Label>First message</Label>
                                  <Hint>Greet your customers when they launch the messaging widget</Hint>
                                  <StyledTextarea
                                    placeholder="This is a greeting."
                                    value={firstMessage}
                                    onChange={(e) => setFirstMessage(e.target.value)}
                                  />
                                </Field>

                                <Field>
                                  <Label>Customer details</Label>
                                  <Hint>Collect personal information so your agents know who they're talking to</Hint>
                                  <CustomerDetailsCard>
                                    <CustomerDetailsIcon>
                                      <UserCircleIcon />
                                    </CustomerDetailsIcon>
                                    <CustomerDetailsText>
                                      <CustomerDetailsTitle>Name</CustomerDetailsTitle>
                                      <CustomerDetailsSubtitle>Text field</CustomerDetailsSubtitle>
                                    </CustomerDetailsText>
                                  </CustomerDetailsCard>
                                </Field>

                                <Field>
                                  <Label>Follow-up message</Label>
                                  <Hint>Let your customer know what will happen next</Hint>
                                  <StyledTextarea
                                    placeholder="This is a follow up."
                                    value={followUpMessage}
                                    onChange={(e) => setFollowUpMessage(e.target.value)}
                                  />
                                </Field>
                              </div>
                            </TabPanel>
                            {selectedSchedule === 'Custom schedule' && (
                              <TabPanel item="outside">
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingTop: '12px' }}>
                                  <Field>
                                    <Label>First message</Label>
                                    <Hint>Greet your customers when they launch the messaging widget</Hint>
                                    <StyledTextarea
                                      placeholder="This is a greeting."
                                      value={firstMessage}
                                      onChange={(e) => setFirstMessage(e.target.value)}
                                    />
                                  </Field>

                                  <Field>
                                    <Label>Customer details</Label>
                                    <Hint>Collect personal information so your agents know who they're talking to</Hint>
                                    <CustomerDetailsCard>
                                      <CustomerDetailsIcon>
                                        <UserCircleIcon />
                                      </CustomerDetailsIcon>
                                      <CustomerDetailsText>
                                        <CustomerDetailsTitle>Name</CustomerDetailsTitle>
                                        <CustomerDetailsSubtitle>Text field</CustomerDetailsSubtitle>
                                      </CustomerDetailsText>
                                    </CustomerDetailsCard>
                                  </Field>

                                  <Field>
                                    <Label>Follow-up message</Label>
                                    <Hint>Let your customer know what will happen next</Hint>
                                    <StyledTextarea
                                      placeholder="This is a follow up."
                                      value={followUpMessage}
                                      onChange={(e) => setFollowUpMessage(e.target.value)}
                                    />
                                  </Field>
                                </div>
                              </TabPanel>
                            )}
                          </StyledTabs>
                        </ExpandedContent>
                      )}
                    </ExpandableCard>
                  </div>
                </>
              )}

              {currentStep === 3 && (
                <>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                      <PageTitle>AI agent</PageTitle>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <PageDescription>
                          To keep your automated responses active, you need to set up an AI agent. This is the system component that delivers your responses.
                        </PageDescription>
                        <Anchor href="#" isExternal>
                          Learn more about AI agents
                        </Anchor>
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <Field>
                        <Label>Name</Label>
                        <Hint>Give your AI agent a name. This is how you will identify it in the dashboard. It is also the name customers will see when they reach out.</Hint>
                        <Input
                          value={agentName}
                          onChange={(e) => setAgentName(e.target.value)}
                        />
                      </Field>

                      <Field>
                        <Label>Language</Label>
                        <Hint>The default language your AI agent uses to communicate.</Hint>
                        <CustomDropdownContainer ref={languageDropdownRef} onClick={(e) => e.stopPropagation()}>
                          <CustomDropdownTrigger
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setLanguageDropdownOpen(!languageDropdownOpen);
                            }}
                          >
                            {agentLanguage}
                            <ChevronDownIcon />
                          </CustomDropdownTrigger>
                          <CustomDropdownMenu $isOpen={languageDropdownOpen}>
                            <CustomMenuItem
                              type="button"
                              onClick={(e) => handleLanguageSelect('English', e)}
                            >
                              English
                            </CustomMenuItem>
                            <CustomMenuItem
                              type="button"
                              onClick={(e) => handleLanguageSelect('Spanish', e)}
                            >
                              Spanish
                            </CustomMenuItem>
                            <CustomMenuItem
                              type="button"
                              onClick={(e) => handleLanguageSelect('French', e)}
                            >
                              French
                            </CustomMenuItem>
                            <CustomMenuItem
                              type="button"
                              onClick={(e) => handleLanguageSelect('German', e)}
                            >
                              German
                            </CustomMenuItem>
                          </CustomDropdownMenu>
                        </CustomDropdownContainer>
                      </Field>
                    </div>
                  </div>
                </>
              )}

              {currentStep === 4 && (
                <>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <PageTitle>Moving responses</PageTitle>
                    <PageDescription>
                      Your Messenger responses are being moved to the AI agents dashboard.
                    </PageDescription>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '10px' }}>
                    {selectedChannels.map((channel, index) => {
                      const isProcessing = index === currentMigratingIndex;
                      const isWaiting = index > currentMigratingIndex;
                      const currentStepIndex = migrationSteps[channel.id];
                      const isDone = currentStepIndex === 3;

                      let stepLabel = 'Waiting for migration';
                      if (isDone) {
                        stepLabel = 'Done';
                      } else if (isProcessing && currentStepIndex !== undefined && currentStepIndex >= 0) {
                        stepLabel = migrationStepLabels[currentStepIndex];
                      } else if (!isWaiting && currentStepIndex !== undefined) {
                        stepLabel = migrationStepLabels[currentStepIndex];
                      }

                      return (
                        <MigrationCard key={channel.id}>
                          <MigrationCardTitle>{channel.name}</MigrationCardTitle>
                          <MigrationStatus>
                            {isProcessing && !isDone && currentStepIndex !== undefined && (
                              <StatusIndicator>
                                <Dots size="12" />
                              </StatusIndicator>
                            )}
                            {isDone && (
                              <StatusIndicator $isSuccess>
                                <CheckIcon />
                              </StatusIndicator>
                            )}
                            <MigrationStatusText $isWaiting={isWaiting} $isDone={isDone}>
                              {stepLabel}
                            </MigrationStatusText>
                          </MigrationStatus>
                        </MigrationCard>
                      );
                    })}
                  </div>
                </>
              )}
              </>
              )}
            </StepperRight>

            <ActionFooter $showPrevious={!showResumeScreen && currentStep > 1 && currentStep < 4}>
              {showResumeScreen ? (
                <div style={{ display: 'flex', gap: '20px' }}>
                  <Button onClick={handleSaveAndExit}>Save and exit</Button>
                  <Button isPrimary onClick={handleResumeFromSaved}>Next</Button>
                </div>
              ) : currentStep < 4 ? (
                <>
                  {currentStep > 1 && (
                    <Button isBasic onClick={handlePrevious}>Previous step</Button>
                  )}
                  <div style={{ display: 'flex', gap: '20px' }}>
                    {(currentStep === 2 || currentStep === 3) && (
                      <Button onClick={handleSaveAndExit}>Save and exit</Button>
                    )}
                    <Button isPrimary onClick={handleNext}>Next</Button>
                  </div>
                </>
              ) : (
                <Button isPrimary disabled>
                  <Dots />
                </Button>
              )}
            </ActionFooter>
          </StepperBody>
        )}
      </Modal>
    </ThemeProvider>
  );
}

export default MigrationWizard;
