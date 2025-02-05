import { Layout, theme } from "antd";
import ListCharacters from "../../components/ListCharacters";
import { Typography } from "antd";

const { Title } = Typography;

const { Content } = Layout;

const Admin: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Content style={{ padding: "0 48px" }}>
        <Title>Personajes</Title>
        <div
          style={{
            padding: 24,
            minHeight: 380,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <ListCharacters />
        </div>
      </Content>
    </Layout>
  );
};

export default Admin;
