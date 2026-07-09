import { Button, Typography, Space } from "antd";

const { Title, Paragraph } = Typography;

function App() {
  return (
      <div style={{ padding: 40 }}>
        <Space direction="vertical">
          <Title>React + Vite + Ant Design</Title>

          <Paragraph>
            Your project is ready.
          </Paragraph>

          <Button type="primary">
            Hello Ant Design
          </Button>
        </Space>
      </div>
  );
}

export default App;