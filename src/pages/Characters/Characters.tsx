import { Breadcrumb, Layout, theme } from "antd";
import ListCharacters from "../../components/ListCharacters";

const { Content } = Layout;

const Admin: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Content style={{ padding: "0 48px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Personajes</Breadcrumb.Item>
        </Breadcrumb>
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
